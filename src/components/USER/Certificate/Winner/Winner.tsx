import React, { useState } from 'react';
import { IonButton, useIonToast } from '@ionic/react';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import './Winner.css'
import { capitalCase } from "change-case";
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import {FileOpener} from '@capacitor-community/file-opener'

const Winner: React.FC = ({ UserData }: any) => {
  const [Locked, setLocked] = useState(false);
  const [showToast] = useIonToast();

  let year;
  switch (UserData[1].academicInfo.year) {
    case 'first':
      year = '1st Year';
      break;

    case 'second':
      year = '2nd Year';
      break;

    case 'third':
      year = '3rd Year';
      break;

    case 'fourth':
      year = '4th Year';
      break;
  }

  let branch = (capitalCase(UserData[1].academicInfo.course.replaceAll('_', ' ')).replaceAll(' ', '.') + " " + UserData[1].academicInfo.branch.toUpperCase() + " " + year)

  let position: any;

  switch (UserData[0].position) {
    case 1:
      position = '1st Position';
      break;

    case 2:
      position = '2nd Position';
      break;

    case 3:
      position = '3rd Position';
      break;
  }
  const UserInfo = {
    Name: capitalCase(UserData[1].name),
    URN: UserData[1].academicInfo.urn,
    Branch: branch,
    Position: position,
    SrNo: `Serial No: SP/ATH/23-24/${UserData[1].academicInfo.urn}`,
    Event: UserData[0].eventName,
  }

  const onDownloadPDF = async () => {
    try {
      const existingPdfBytes = await fetch('/cert.pdf').then((res) => res.arrayBuffer());

      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();

      const textSize = 25;
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      const nameWidth = font.widthOfTextAtSize(UserInfo.Name, textSize);
      const crnWidth = font.widthOfTextAtSize(UserInfo.URN, textSize);
      const EventWidth = font.widthOfTextAtSize(UserInfo.Event, textSize);
      const PositionWidth = font.widthOfTextAtSize(UserInfo.Position, textSize);
      const BranchWidth = font.widthOfTextAtSize(UserInfo.Branch, textSize);
      const lineHeight = font.heightAtSize(textSize);

      console.log(nameWidth, crnWidth)

      const nameX = (width - nameWidth) / 2;
      const nameY = height / 2 - lineHeight;
      console.log(nameX, nameY)

      const crnX = (490 + ((210 - crnWidth) / 2));
      const crnY = height / 2 - lineHeight - 50;

      const BranchX = (130 + ((260 - BranchWidth) / 2));
      const BranchY = height / 2 - lineHeight - 50;

      const PositionX = (139 + ((170 - PositionWidth) / 2));
      const PositionY = height / 2 - lineHeight - 95;

      const EventX = (311 + ((187 - EventWidth) / 2));
      const EventY = height / 2 - lineHeight - 95;

      const SerialNoX = (30);
      const SerialNoY = 5;


      firstPage.drawText(UserInfo.Name, {
        x: nameX,
        y: nameY,
        size: textSize,
        font: font,
        color: rgb(0, 0, 0),
        rotate: degrees(0),
      });

      firstPage.drawText(UserInfo.URN, {
        x: crnX,
        y: crnY,
        size: 15,
        font: font,
        color: rgb(0, 0, 0),
        rotate: degrees(0),
      });
      firstPage.drawText(UserInfo.Branch, {
        x: BranchX,
        y: BranchY,
        size: 15,
        font: font,
        color: rgb(0, 0, 0),
        rotate: degrees(0),
      });
      firstPage.drawText(UserInfo.Position, {
        x: PositionX,
        y: PositionY,
        size: 15,
        font: font,
        color: rgb(0, 0, 0),
        rotate: degrees(0),
      });
      firstPage.drawText(UserInfo.Event, {
        x: EventX,
        y: EventY,
        size: 15,
        font: font,
        color: rgb(0, 0, 0),
        rotate: degrees(0),
      });

      firstPage.drawText(UserInfo.SrNo, {
        x: SerialNoX,
        y: SerialNoY,
        size: 15,
        font: font,
        color: rgb(0, 0, 0),
        rotate: degrees(0),
      });

      const modifiedPdfBytes = await pdfDoc.save();

      function arrayBufferToBase64(buffer:any) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }
      console.log(modifiedPdfBytes)
      const pdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      console.log(pdfBlob)
      const arrayBuffer = await pdfBlob.arrayBuffer();
      console.log(arrayBuffer)
      const pdfBase64 =  arrayBufferToBase64(arrayBuffer);
      console.log(pdfBase64)

      if (Capacitor.isNativePlatform()) {
        const fileName = `${UserInfo.Name}_${UserInfo.Event}.pdf`;
        Filesystem.requestPermissions()

        const result = await Filesystem.writeFile({
          path: fileName,
          data: pdfBase64,
          directory: Directory.Documents,
        });
        if (result.uri) {
          showToast('Certificate Downloaded, file/documents', 2000)
          const path = result.uri;
          FileOpener.open({
            filePath: path,
            contentType: 'application/pdf'
          })
        } else {
          console.error('Failed to write PDF to filesystem.');
        }
      } else {
        // For web platform, create a Blob and initiate download
        const pdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = pdfUrl;
        downloadLink.download = `${UserInfo.Name} ${UserInfo.URN}.pdf`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        // window.open(pdfUrl)  for opening PDF files
        showToast('Certificate Downloaded, file/documents', 2000)
        URL.revokeObjectURL(pdfUrl);
      }
    } catch (error) {
      console.error('Error generating or downloading PDF:', error);
    }
  };


  return (
    <div className="container">
      {(Locked) ?
        <IonButton style={{ width: 'fit-content' }} className="cssbuttons-io-button" disabled={true}>
          <div className="button-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M1 14.5a6.496 6.496 0 0 1 3.064-5.519 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12L7 21c-3.356-.274-6-3.078-6-6.5zm15.848 4.487a4.5 4.5 0 0 0 2.03-8.309l-.807-.503-.12-.942a6.001 6.001 0 0 0-11.903 0l-.12.942-.805.503a4.5 4.5 0 0 0 2.029 8.309l.173.013h9.35l.173-.013zM13 12h3l-4 5-4-5h3V8h2v4z" fill="currentColor"></path>
            </svg>
            <span > Not available yet </span>
          </div>
        </IonButton>
        :
        <IonButton onClick={onDownloadPDF} className="cssbuttons-io-button">
          <div className="button-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M1 14.5a6.496 6.496 0 0 1 3.064-5.519 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12L7 21c-3.356-.274-6-3.078-6-6.5zm15.848 4.487a4.5 4.5 0 0 0 2.03-8.309l-.807-.503-.12-.942a6.001 6.001 0 0 0-11.903 0l-.12.942-.805.503a4.5 4.5 0 0 0 2.029 8.309l.173.013h9.35l.173-.013zM13 12h3l-4 5-4-5h3V8h2v4z" fill="currentColor"></path>
            </svg>
            <span > Download </span>
          </div>
        </IonButton>
      }

    </div>
  );
};

export default Winner;