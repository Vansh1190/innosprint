import Fuse from 'fuse.js'

export function ExportStudentDataCSV(data: any, filter: any) {
    const csvData: any = []
    const GenFilteredData = () => {

    }
    data.map((item: any) => {
        if (filter.course && filter.branch === '') {
            if (item.academicInfo.course !== filter.course) {
                return null;
            }
        }
        else if ((item.academicInfo.branch !== filter.branch || filter.course !== item.academicInfo.course) && filter.event == '') {
            return null;
        }
        if (item.events.length > 0) {
            const SS = item.events.map((event: any) => {
                if (filter.branch === '' && filter.course === '' && filter.event !== '') {
                    if (event.sport._id !== filter.event) {
                        return null
                    }
                }
                const entry: any = {
                    'Name': item.name,
                    'Email': item.email,
                    'Phone': item.phone,
                    'Gender': item.gender,
                    'ProgressValue': item.progressValue,
                    'Role': item.role,
                    'IsVerified': item.isVerified,
                    'JerseyNo': item.jerseyNo,
                    'Course': item.academicInfo.course,
                    'Branch': item.academicInfo.branch,
                    'URN': item.academicInfo.urn,
                    'Year': item.academicInfo.year,
                };
                entry[`Event`] = event.sport.sportName;
                entry[`Position`] = event.position;
                return entry
            });
            csvData.push(...SS)
        }
    })
    // Extract event data and add as columns

    if (filter.branch === '' && filter.course === '' && filter.event !== '') {
        return csvData.filter((item: any) => item !== null);
    }else{
        return csvData

    }
}