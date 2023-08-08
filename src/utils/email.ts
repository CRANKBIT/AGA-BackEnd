import nodemailer from 'nodemailer'

const sendEmail: (email: string, title: string, message: string) => void = async (
  email: string,
  title: string,
  message: string
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: title,
    text: message,
  }

  await transporter.sendMail(mailOptions)
}

export default sendEmail
