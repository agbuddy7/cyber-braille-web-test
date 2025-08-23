class BrailleApp {
    constructor() {
        this.canvas = document.getElementById('brailleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.hovering = false;
        this.audio = null;
        
        
        this.circles = [
            { x: 160, y: 60, radius: 8 },    // (0.2, 0.85)
            { x: 240, y: 60, radius: 8 },    // (0.3, 0.85)
            { x: 240, y: 80, radius: 8 },    // (0.3, 0.80)
            { x: 320, y: 60, radius: 8 },    // (0.4, 0.85)
            { x: 344, y: 60, radius: 8 },    // (0.43, 0.85)
            { x: 400, y: 60, radius: 8 },    // (0.5, 0.85)
            { x: 424, y: 60, radius: 8 },    // (0.53, 0.85)
            { x: 424, y: 80, radius: 8 },    // (0.53, 0.80)
            { x: 480, y: 60, radius: 8 },    // (0.6, 0.85)
            { x: 504, y: 80, radius: 8 }     // (0.63, 0.80)
        ];
        
        // Number labels positions
        this.labels = [
            { x: 160, y: 160, text: "1" },
            { x: 240, y: 160, text: "2" },
            { x: 320, y: 160, text: "3" },
            { x: 400, y: 160, text: "4" },
            { x: 480, y: 160, text: "5" }
        ];
        
        this.init();
    }
    
    init() {
        this.loadAudio();
        this.draw();
        this.setupEventListeners();
    }
    
    loadAudio() {
       
        this.audio = new Audio();
        
        
        this.audio.src = 'hover.mp3';
        this.audio.load();
        
        // If hover.mp3 fails, create a synthetic beep
        this.audio.onerror = () => {
            console.log('hover.mp3 not found, using synthetic beep');
            this.createSyntheticBeep();
        };
    }
    
    createSyntheticBeep() {
       
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.audio = null; 
    }
    
    playSound() {
        if (this.audio && this.audio.src) {
            this.audio.currentTime = 0;
            this.audio.play().catch(e => console.log('Audio play failed:', e));
        } else if (this.audioContext) {
        
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.1);
        }
    }
    
    stopSound() {
        if (this.audio && this.audio.src) {
            this.audio.pause();
            this.audio.currentTime = 0;
        }
    }
    
    draw() {
   
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
       
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Hover over the dots', this.canvas.width / 2, 30);
        
        this.ctx.fillStyle = 'black';
        this.circles.forEach(circle => {
            this.ctx.beginPath();
            this.ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
            this.ctx.fill();
        });
        
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'center';
        this.labels.forEach(label => {
            this.ctx.fillText(label.text, label.x, label.y);
        });
    }
    
    setupEventListeners() {
        this.canvas.addEventListener('mousemove', (event) => {
            this.onHover(event);
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            if (this.hovering) {
                this.hovering = false;
                this.stopSound();
            }
        });
    }
    
    onHover(event) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        
        // Check if mouse is over any circle
        const overAny = this.circles.some(circle => {
            const dx = mouseX - circle.x;
            const dy = mouseY - circle.y;
            return Math.sqrt(dx * dx + dy * dy) <= circle.radius;
        });
        
        if (overAny && !this.hovering) {
            this.hovering = true;
            this.playSound();
        } else if (!overAny && this.hovering) {
            this.hovering = false;
            this.stopSound();
        }
    }
}

window.addEventListener('load', () => {
    new BrailleApp();
});