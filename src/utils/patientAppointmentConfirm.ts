export const getAppointmentConfirmationHTML = (
  patientName: string,
  doctorName: string,
  date: string,
  time: string
) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 10px; overflow: hidden;">
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); padding: 40px 20px; text-align: center;">
    <h2 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Appointment Confirmed ✅</h2>
  </div>
  
  <!-- Content -->
  <div style="padding: 30px 20px;">
    <p style="color: #2d3748; font-size: 18px; margin: 0 0 15px 0;">
      Hi <strong style="color: #48bb78;">${patientName}</strong>,
    </p>
    
    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
      Your appointment with <strong>Dr. ${doctorName}</strong> has been successfully scheduled for:
    </p>
    
    <!-- Appointment Details -->
    <div style="background: linear-gradient(135deg, #f0fff4 0%, #dcfce7 100%); padding: 25px; border-radius: 8px; border-left: 4px solid #48bb78; margin: 20px 0;">
      <ul style="margin: 0; padding: 0; list-style: none; color: #2d3748; font-size: 16px;">
        <li style="margin-bottom: 12px; display: flex; align-items: center;">
          <strong style="color: #276749; width: 80px; display: inline-block;">📅 Date:</strong> 
          <span style="font-weight: 600;">${date}</span>
        </li>
        <li style="margin-bottom: 0; display: flex; align-items: center;">
          <strong style="color: #276749; width: 80px; display: inline-block;">🕐 Time:</strong> 
          <span style="font-weight: 600;">${time}</span>
        </li>
      </ul>
    </div>
    
    <!-- Important Note -->
    <div style="background: #fff5f5; padding: 20px; border-radius: 8px; border-left: 4px solid #f56565; margin: 25px 0;">
      <p style="margin: 0; color: #c53030; font-size: 14px; font-weight: 600;">
        ⚠️ Important: Please arrive 10 minutes early. You can reschedule via your dashboard.
      </p>
    </div>
    
    <!-- Buttons -->
    <div style="text-align: center; margin: 30px 0;">
      <a href="#" style="background: linear-gradient(135deg, #48bb78, #38a169); color: white; text-decoration: none; padding: 12px 24px; border-radius: 25px; font-weight: 600; font-size: 15px; display: inline-block; margin: 0 8px 8px 0; box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);">
        View Dashboard
      </a>
      <a href="#" style="background: transparent; color: #48bb78; text-decoration: none; padding: 12px 24px; border-radius: 25px; font-weight: 600; font-size: 15px; display: inline-block; border: 2px solid #48bb78; margin: 0 8px 8px 0;">
        Reschedule
      </a>
    </div>
  </div>
  
  <!-- Footer -->
  <div style="background: #2d3748; padding: 25px; text-align: center;">
    <p style="margin: 0; color: white; font-size: 16px;">
      Regards,<br>
      <strong style="color: #48bb78;">Clinic Team</strong>
    </p>
    <hr style="border: none; height: 1px; background: #4a5568; margin: 20px 0;">
    <p style="margin: 0; color: #a0aec0; font-size: 12px;">
      This is an automated confirmation. Please do not reply to this email.
    </p>
  </div>
</div>
`;