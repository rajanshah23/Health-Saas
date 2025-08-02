export const getReportNotificationPatientHTML = (
  patientName: string,
  reportType: string
) => `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>🧾 Your Medical Report is Ready</h2>
    <p>Hi ${patientName},</p>
    <p>Your medical report titled <strong>${reportType}</strong> is now available on your dashboard.</p>
    <p>Please log in to review it at your earliest convenience.</p>
    <br />
    <p>Regards,<br /><strong>Clinic Team</strong></p>
  </div>
`;
