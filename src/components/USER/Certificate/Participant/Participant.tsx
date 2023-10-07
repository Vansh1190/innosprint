import React, { useState } from "react";
import { IonButton, useIonToast } from "@ionic/react";
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
import "./Participant.css";
// import { capitalCase } from "change-case";
import { Capacitor } from "@capacitor/core";
// import { Directory, Filesystem } from "@capacitor/filesystem";
// import { FileOpener } from "@capacitor-community/file-opener";

const Certificate: React.FC = ({ UserData }: any) => {
  const [Locked, setLocked] = useState(false);
  const [showToast] = useIonToast();

  let year;

  console.log(UserData)
  switch (UserData[1].year) {
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

//   let branch = (capitalCase(UserData[1].course.replaceAll('_', ' ')).replaceAll(' ', '.') + " " + UserData[1].branch.toUpperCase() + " " + year)
//   console.log(branch)

  let position: any;
  console.log(UserData[0].position)

  switch (UserData[0].position) {
    case 0:
      position = 'Participant';
      break;

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
    URN: UserData[1].urn,
    Branch: branch,
    Position: 'Paticipant',
    SrNo: `Serial No: SP/ATH/23-24/${UserData[1].urn}`,
    Event: UserData[0].EventName,
  }

  console.log(UserData)
  console.log(UserInfo)
  const onDownloadPDF = async () => {
    try {
      console.log(UserInfo)
      if (UserInfo.Position == 'Participated') {

      }
      const existingPdfBytes = await fetch("/certificate.pdf").then((res) =>
        res.arrayBuffer()
      );

      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();

      const textSize = 25;
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      const nameWidth = font.widthOfTextAtSize(UserInfo.Name, textSize);
      const crnWidth = font.widthOfTextAtSize(UserInfo.URN, textSize);
      const EventWidth = font.widthOfTextAtSize(UserInfo.Event, textSize);
      const BranchWidth = font.widthOfTextAtSize(UserInfo.Branch, textSize);
      const lineHeight = font.heightAtSize(textSize);

      console.log(nameWidth, crnWidth);

      const nameX = (width - nameWidth) / 2;
      const nameY = height / 2 - lineHeight - 8;
      console.log(nameX, nameY);

      const crnX = 517 + (134 - crnWidth) / 2;
      const crnY = height - 378;

      const BranchX = 252 + (167 - BranchWidth) / 2;
      const BranchY = height - 378;


      const EventX = 275 + (196 - EventWidth) / 2;
      const EventY = height - 417;

      const SerialNoX = 30;
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
        size: 19,
        font: font,
        color: rgb(0, 0, 0),
        rotate: degrees(0),
      });
      firstPage.drawText(UserInfo.Branch, {
        x: BranchX,
        y: BranchY,
        size: 19,
        font: font,
        color: rgb(0, 0, 0),
        rotate: degrees(0),
      });
      firstPage.drawText(UserInfo.Event, {
        x: EventX,
        y: EventY,
        size: 19,
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

      function arrayBufferToBase64(buffer: any) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }
      const pdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const arrayBuffer = await pdfBlob.arrayBuffer();
      const pdfBase64 = arrayBufferToBase64(arrayBuffer);

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
        showToast('Certificate Downloaded, check your download folder', 2000)
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

export default Certificate;