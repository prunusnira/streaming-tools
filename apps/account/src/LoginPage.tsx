import { startLogin } from "@account/api";
import { Button } from "@streaming-tools/ui";
import { authProviderLogoUrls } from "@streaming-tools/auth";
import styles from "@account/LoginPage.module.css";

export const LoginPage = () => (
    <main className={styles.page}>
        <h1 className={styles.title}>로그인</h1>
        <p className={styles.description}>연결할 서비스를 선택해줘.</p>
        <div className={styles.actions}>
            <Button
                icon={
                    <img className={styles.buttonLogo} src={authProviderLogoUrls.twitch} alt="" />
                }
                onClick={() => void startLogin("twitch")}
            >
                Twitch로 로그인
            </Button>
            <Button
                variant="primary"
                icon={<img className={styles.buttonLogo} src={authProviderLogoUrls.chzzk} alt="" />}
                onClick={() => void startLogin("chzzk")}
            >
                치지직으로 로그인
            </Button>
            <Button
                icon={<img className={styles.buttonLogo} src={authProviderLogoUrls.soop} alt="" />}
                onClick={() => void startLogin("soop")}
            >
                SOOP으로 로그인
            </Button>
        </div>
    </main>
);
