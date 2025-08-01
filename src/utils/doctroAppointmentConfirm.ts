export const getDoctorAppointmentEmailHTML = (
  doctorName: string,
  patientName: string,
  date: string,
  time: string
) => `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 10px; overflow: hidden;">
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%); padding: 40px 20px; text-align: center;">
    <h2 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">New Appointment Assigned 📋</h2>
  </div>
  
  <!-- Content -->
  <div style="padding: 30px 20px;">
    <p style="color: #2d3748; font-size: 18px; margin: 0 0 15px 0;">
      Hi <strong style="color: #4299e1;">Dr. ${doctorName}</strong>,
    </p>
    
    <p style="color: #4a5568; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
      You have been assigned a new appointment with patient <strong>${patientName}</strong>:
    </p>
    
    <!-- Appointment Details -->
    <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); padding: 25px; border-radius: 8px; border-left: 4px solid #4299e1; margin: 20px 0;">
      <ul style="margin: 0; padding: 0; list-style: none; color: #2d3748; font-size: 16px;">
        <li style="margin-bottom: 12px; display: flex; align-items: center;">
          <strong style="color: #1e40af; width: 80px; display: inline-block;">👤 Patient:</strong> 
          <span style="font-weight: 600;">${patientName}</span>
        </li>
        <li style="margin-bottom: 12px; display: flex; align-items: center;">
          <strong style="color: #1e40af; width: 80px; display: inline-block;">📅 Date:</strong> 
          <span style="font-weight: 600;">${date}</span>
        </li>
        <li style="margin-bottom: 0; display: flex; align-items: center;">
          <strong style="color: #1e40af; width: 80px; display: inline-block;">🕐 Time:</strong> 
          <span style="font-weight: 600;">${time}</span>
        </li>
      </ul>
    </div>
    
    <!-- Quick Note -->
    <div style="background: #f0fff4; padding: 20px; border-radius: 8px; border-left: 4px solid #22c55e; margin: 25px 0;">
      <p style="margin: 0; color: #166534; font-size: 14px;">
        💡 <strong>Reminder:</strong> Please check your dashboard for more details about this appointment.
      </p>
    </div>
    
    <!-- Buttons -->
    <div style="text-align: center; margin: 30px 0;">
      <a href="#" style="background: linear-gradient(135deg, #4299e1, #3182ce); color: white; text-decoration: none; padding: 12px 24px; border-radius: 25px; font-weight: 600; font-size: 15px; display: inline-block; margin: 0 8px 8px 0; box-shadow: 0 4px 15px rgba(66, 153, 225, 0.3);">
        View Dashboard
      </a>
      <a href="#" style="background: transparent; color: #4299e1; text-decoration: none; padding: 12px 24px; border-radius: 25px; font-weight: 600; font-size: 15px; display: inline-block; border: 2px solid #4299e1; margin: 0 8px 8px 0;">
        Patient History
      </a>
    </div>
  </div>
  
  <!-- Footer -->
  <div style="background: #2d3748; padding: 25px; text-align: center;">
    <p style="margin: 0; color: white; font-size: 16px;">
      Regards,<br>
      <strong style="color: #4299e1;">Clinic Team</strong>
    </p>
    <hr style="border: none; height: 1px; background: #4a5568; margin: 20px 0;">
    <p style="margin: 0; color: #a0aec0; font-size: 12px;">
      This is an automated notification. Please do not reply to this email.
    </p>
  </div>
</div>
`;