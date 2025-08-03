export const getPatientWelcomeEmailHTML = (patientName: string, clinicName: string,tempPassword: string,
  clinicNumber: string,patientEmail:string) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 10px; overflow: hidden;">
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
    <h2 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Welcome to ${clinicName}! 🏥</h2>
  </div>
  
  <!-- Content -->
  <div style="padding: 30px 20px;">
    <p style="color: #2d3748; font-size: 18px; margin: 0 0 20px 0; text-align: center;">
      Dear <strong style="color: #667eea;">${patientName}</strong>,
    </p>
    
    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
      Thank you for choosing <strong>${clinicName}</strong> to take care of your health.
    </p>
    
    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
      With your personalized patient portal, you can now:
    </p>
    
    <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin: 20px 0;">
      <ul style="margin: 0; padding-left: 20px; color: #4a5568; font-size: 15px; line-height: 1.8;">
        <li style="margin-bottom: 10px;"><strong>📅 Book and manage your appointments easily</strong></li>
        <li style="margin-bottom: 10px;"><strong>📄 Access your medical reports securely</strong></li>
        <li style="margin-bottom: 10px;"><strong>💬 Communicate with your healthcare providers</strong></li>
        <li style="margin-bottom: 0;"><strong>💳 View and pay your bills online</strong></li>
      </ul>
    </div>
    
    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 25px 0;">
      We are committed to providing you with the best care possible. Start exploring your dashboard today to manage your health conveniently.
    </p>
     <div style="background: #f0f4f8; padding: 20px; border-radius: 8px; margin-top: 30px;">
  <h3 style="color: #2d3748;">🔐 Your Login Credentials</h3>
  <p style="color: #4a5568; font-size: 15px;">Please use the following credentials to log into your dashboard:</p>
  <ul style="list-style: none; padding-left: 0;">
    <li><strong>📧 Email:</strong> ${patientEmail}</li>
    <li><strong>🏥 Clinic Number:</strong> ${clinicNumber}</li>
    <li><strong>🔑 Temporary Password:</strong> ${tempPassword}</li>
  </ul>
  <p style="color: #e53e3e; font-size: 13px;">Please change your password after your first login.</p>
</div>
    <div style="text-align: center; margin: 30px 0;">
      <a href="#" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; text-decoration: none; padding: 14px 28px; border-radius: 25px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
        Access Dashboard
      </a>
    </div>
    
    <div style="background: #edf2f7; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
      <p style="margin: 0; color: #4a5568; font-size: 14px;">
        <strong>Need help?</strong> Our support team is here for you 24/7.<br>
        Contact us anytime for assistance.
      </p>
    </div>
  </div>
  
  <!-- Footer -->
  <div style="background: #2d3748; padding: 25px; text-align: center;">
    <p style="margin: 0; color: white; font-size: 16px;">
      Warm regards,<br>
      <strong style="color: #667eea;">The ${clinicName} Team</strong>
    </p>
    <hr style="border: none; height: 1px; background: #4a5568; margin: 20px 0;">
    <p style="margin: 0; color: #a0aec0; font-size: 12px;">
      This is an automated message. Please do not reply to this email.
    </p>
  </div>
</div>
`;