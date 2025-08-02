export const getReportNotificationDoctorHTML = (
  doctorName: string,
  patientName: string,
  reportType: string
) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>📥 New Patient Report Uploaded</h2>
    <p>Dear Dr. ${doctorName},</p>
    <p>A new report titled <strong>${reportType}</strong> has been uploaded for your patient <strong>${patientName}</strong>.</p>
    <p>Please log in to your dashboard to review it.</p>
    <br />
    <p>Regards,<br /><strong>Clinic Team</strong></p>
  </div>
`;
