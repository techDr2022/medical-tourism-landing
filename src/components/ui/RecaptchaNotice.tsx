import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

export function RecaptchaNotice() {
  if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
    return null;
  }

  return (
    <Typography variant="caption" color="text.disabled" sx={{ textAlign: "center", display: "block" }}>
      This site is protected by reCAPTCHA and the Google{" "}
      <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" color="inherit">
        Privacy Policy
      </Link>{" "}
      and{" "}
      <Link href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" color="inherit">
        Terms of Service
      </Link>{" "}
      apply.
    </Typography>
  );
}
