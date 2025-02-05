import express, { Request, Response } from "express";
import { createTransport, SendMailOptions, Transporter } from "nodemailer";

const app = express();
const PORT = 3000;

const transporter: Transporter = createTransport({
  service: "gmail",
  auth: {
    user: "lodionglower@gmail.com",
    pass: "sqzadnavkornwehv",
  },
});

const sendMail = async ({ to, text }: SendMailOptions) => {
  const options: SendMailOptions = {
    from: "lodionglower@gmail.com",
    to,
    subject: "Brgy. Lower Lodiong Notification",
    text,
  };

  await transporter.sendMail(options);
};

app.post("/api/email", async (req: Request, res: Response) => {
  const { to, text }: { to: string; text: string } = req.body;

  await sendMail({ to, text });

  res.json({ message: "Email sent successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
