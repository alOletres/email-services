import express, { Request, Response } from "express";
import { createTransport, SendMailOptions, Transporter } from "nodemailer";
import cors from "cors";
import { config } from "dotenv";
config();

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter: Transporter = createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendMail = async ({ to, text }: SendMailOptions) => {
  const options: SendMailOptions = {
    from: EMAIL_USER,
    to,
    subject: "Brgy. Lower Lodiong Notification",
    text,
  };

  await transporter.sendMail(options);
};

app.post("/api/email", async (req: Request, res: Response) => {
  try {
    const { to, text }: { to: string; text: string } = req.body;

    await sendMail({ to, text });

    res.json({ message: "Email sent successfully" });
  } catch (err) {
    console.log("err", err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
