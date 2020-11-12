class TTSPlay {
    private voices = new Array<SpeechSynthesisVoice>();

    constructor() {
        this.setVoiceList();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = this.setVoiceList;
        }
    }

    setVoiceList = () => {
        this.voices = window.speechSynthesis.getVoices();
    }

    speech = (txt: string) => {
        if(!window.speechSynthesis) {
            alert("음성 재생을 지원하지 않는 브라우저입니다");
            return;
        }
        
        const lang = 'ko-KR';
        const utterThis = new SpeechSynthesisUtterance(txt);

        utterThis.onend = (event: SpeechSynthesisEvent) => {
            console.log('end');
        };

        utterThis.onerror = (event: SpeechSynthesisEvent) => {
            console.log('error', event);
        };

        let voiceFound = false;
        for(let i = 0; i < this.voices.length ; i++) {
            if(this.voices[i].lang.indexOf(lang) >= 0 || this.voices[i].lang.indexOf(lang.replace('-', '_')) >= 0) {
                utterThis.voice = this.voices[i];
                voiceFound = true;
            }
        }

        if(!voiceFound) {
            alert('voice not found');
            return;
        }

        utterThis.lang = lang;
        utterThis.pitch = 1;
        utterThis.rate = 1; //속도
        window.speechSynthesis.speak(utterThis);
    }
}

export default TTSPlay;