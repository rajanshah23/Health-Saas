export const getWelcomeEmailHTML = (doctorName: string, clinicName: string) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 10px; overflow: hidden;">
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #805ad5 0%, #6b46c1 100%); padding: 40px 20px; text-align: center;">
    <h2 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Welcome to ${clinicName}! 👨‍⚕️</h2>
  </div>
  
  <!-- Content -->
  <div style="padding: 30px 20px;">
    <p style="color: #2d3748; font-size: 18px; margin: 0 0 20px 0; text-align: center;">
      Dear <strong style="color: #805ad5;">${doctorName}</strong>,
    </p>
    
    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
      We're thrilled to have you join <strong>${clinicName}</strong> — your personalized clinic dashboard is ready.
    </p>
    
    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
      As a valued member of our medical team, you now have access to your professional dashboard where you can:
    </p>
    
    <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin: 20px 0;">
      <ul style="margin: 0; padding-left: 20px; color: #4a5568; font-size: 15px; line-height: 1.8;">
        <li style="margin-bottom: 10px;"><strong>👨‍⚕️ View and manage your appointments</strong></li>
        <li style="margin-bottom: 10px;"><strong>📝 Review patient medical reports</strong></li>
        <li style="margin-bottom: 0;"><strong>📅 Update your availability schedule</strong></li>
      </ul>
    </div>
    
    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 25px 0;">
      Start managing your clinical responsibilities effectively today.
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="#" style="background: linear-gradient(135deg, #805ad5, #6b46c1); color: white; text-decoration: none; padding: 14px 28px; border-radius: 25px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(128, 90, 213, 0.3);">
        Access Dashboard
      </a>
    </div>
    
    <div style="background: #edf2f7; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
      <p style="margin: 0; color: #4a5568; font-size: 14px;">
        <strong>Need assistance?</strong> Our support team is available 24/7.<br>
        Contact us anytime for help.
      </p>
    </div>
  </div>
  
  <!-- Footer -->
  <div style="background: #2d3748; padding: 25px; text-align: center;">
    <p style="margin: 0; color: white; font-size: 16px;">
      Warm regards,<br>
      <strong style="color: #805ad5;">The ${clinicName} Team</strong>
    </p>
    <hr style="border: none; height: 1px; background: #4a5568; margin: 20px 0;">
    <p style="margin: 0; color: #a0aec0; font-size: 12px;">
      This is an automated message. Please do not reply to this email.
    </p>
  </div>
</div>
`;