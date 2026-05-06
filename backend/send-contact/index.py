import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с контактной формы на почту владельца сайта."""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    email = body.get("email", "").strip()
    message = body.get("message", "").strip()

    if not name or not email or not message:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Заполните все поля"}),
        }

    smtp_host = os.environ.get("SMTP_HOST", "smtp.yandex.ru")
    smtp_port = int(os.environ.get("SMTP_PORT", "465"))
    smtp_user = os.environ.get("SMTP_USER", "a@aszotin.ru")
    smtp_password = os.environ["SMTP_PASSWORD"]
    recipient = "a@aszotin.ru"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка с сайта ZPM от {name}"
    msg["From"] = smtp_user
    msg["To"] = recipient
    msg["Reply-To"] = email

    html_body = f"""
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
      <h2 style="font-weight: normal; border-bottom: 1px solid #e0dbd0; padding-bottom: 16px;">
        Новая заявка с сайта ZPM
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 24px;">
        <tr>
          <td style="padding: 12px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 120px;">Имя</td>
          <td style="padding: 12px 0;">{name}</td>
        </tr>
        <tr style="border-top: 1px solid #e0dbd0;">
          <td style="padding: 12px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Почта</td>
          <td style="padding: 12px 0;"><a href="mailto:{email}" style="color: #6b8f71;">{email}</a></td>
        </tr>
        <tr style="border-top: 1px solid #e0dbd0;">
          <td style="padding: 12px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Об объекте</td>
          <td style="padding: 12px 0; white-space: pre-wrap;">{message}</td>
        </tr>
      </table>
    </div>
    """

    msg.attach(MIMEText(html_body, "html"))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, recipient, msg.as_string())

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True}),
    }
