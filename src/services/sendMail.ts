import nodemailer from 'nodemailer'
 
interface IData{
    to : string, 
    subject : string, 
    text?: string,
    html?:string
}

const sendMail = async (data:IData)=>{
    const transporter = nodemailer.createTransport({
        service : 'gmail', 
        auth : {
            user :  process.env.NODEMAILER_GMAIL,
            pass :process.env.NODEMAILER_PASS
        }
    })
    const mailOptions = {
       from: `Clinic-Saas Medicare <${process.env.NODEMAILER_GMAIL}>`,
        to : data.to, 
        subject :data.subject, 
        text : data.text || "",
        html:data.html || ""
    }
   try {
    await transporter.sendMail(mailOptions)
   } catch (error) {
     console.error('Error sending email:', error);
    throw error;
   }
}

export default sendMail