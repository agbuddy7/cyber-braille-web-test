class BrailleApp {
    constructor() {
        this.canvas = document.getElementById('brailleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.hovering = false;
        this.audio = null;
        this.currentInput = '';

        this.braillePatterns = {

            //letters

            'A': [0],
            'B': [0,1],
            'C': [0,3],
            'D': [0,3,4],
            'E': [0,4],
            'F': [0,1,3],
            'G': [0,1,3,4],
            'H': [0,1,4],
            'I': [1,3],
            'J': [1,3,4],
            'K': [0,2],
            'L': [0,1,2],
            'M': [0,2,3],
            'N': [0,2,3,4],
            'O': [0,2,4],
            'P': [0,1,2,3],
            'Q': [0,1,2,3,4],
            'R': [0,1,2,4],
            'S': [1,2,3],
            'T': [1,2,3,4],
            'U': [0,2,5],
            'V': [0,1,2,5],
            'W': [1,3,4,5],
            'X': [0,2,3,5],
            'Y': [0,2,3,4,5],
            'Z': [0,2,4,5],

            //Numbers

            '1': [0],
            '2': [0,1],
            '3': [0,3],
            '4': [0,3,4],
            '5': [0,4],
            '6': [0,1,3],
            '7': [0,1,3,4],
            '8': [0,1,4],
            '9': [1,3]
        };

        // List of braille cell dot positions (relative)
        this.dotPositions = [
            { x: -12, y: -18 }, 
            { x: -12, y: 0 },   
            { x: -12, y: 18 },  
            { x: 12, y: -18 }, 
            { x: 12, y: 0 },   
            { x: 12, y: 18 },   
        ];

        this.cellWidth = 70;
        this.cellHeight = 90;
        this.marginLeft = 40;
        this.marginTop = 60;
        this.cellsPerLine = 10; 

        this.circles = [];
        this.labels = [];

        this.init();
    }
    
    init() {
        this.loadAudio();
        this.setupInputHandlers();
        this.updateActiveCircles();
        this.draw();
        this.setupEventListeners();
    }

    setupInputHandlers() {
        const input = document.getElementById('numberInput');
        const clearBtn = document.getElementById('clearBtn');
        const currentDisplay = document.getElementById('currentDisplay');
        
        if (input) {
            input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/[^A-Z0-9]/g, '');
                e.target.value = value;
                this.currentInput = value;

                if (value) {
                    currentDisplay.textContent = `Displaying output: ${value}`;
                } else {
                    currentDisplay.textContent = 'Enter number or alphabets to see the braille output';
                }

                this.updateActiveCircles();
                this.draw();
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (input) input.value = '';
                this.currentInput = '';
                if (currentDisplay) currentDisplay.textContent = 'Enter numbers to see braille patterns';
                this.updateActiveCircles();
                this.draw();
            });
        }
    }

    updateActiveCircles() {
    this.circles = [];
    this.labels = [];
    if (!this.currentInput) return;
          

    this.cellsPerLine = Math.floor((this.canvas.width - 2 * this.marginLeft) / this.cellWidth);
    this.maxRows = Math.floor((this.canvas.height - this.marginTop) / this.cellHeight);

  

    let col = 0, row = 0;
    for (let i = 0; i < this.currentInput.length; i++) {
        const ch = this.currentInput[i];
        this.addBrailleCell(ch, col, row);
        col++;
        if (col >= this.cellsPerLine) {
            col = 0;
            row++;
        }
    }
}

addBrailleCell(char, col, row) {
    const pattern = this.braillePatterns[char];
    if (!pattern) return;
    const xBase = this.marginLeft + col * this.cellWidth;
    const yBase = this.marginTop + row * this.cellHeight;
    pattern.forEach(dotIdx => {
        const pos = this.dotPositions[dotIdx];
        this.circles.push({
            x: xBase + pos.x,
            y: yBase + pos.y,
            radius: 8,
            char,
            dotIndex: dotIdx
        });
    });

    this.labels.push({ x: xBase, y: yBase + 60, text: char });
}
    
    
    loadAudio() {
        this.audio = new Audio();
        this.audio.src = 'hover.mp3';
        this.audio.load();
        
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
        
        // Draw circles (braille dots)
        this.circles.forEach(circle => {
            this.ctx.beginPath();
            this.ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
            this.ctx.fillStyle = '#000';
            this.ctx.fill();
        });

        if (this.labels) {
            this.labels.forEach(label => {
                if (label) {
                    this.ctx.fillStyle = '#333';
                    this.ctx.font = '24px Arial';
                    this.ctx.textAlign = 'center';
                    this.ctx.fillText(label.text, label.x, label.y);
                }
            });
        }
    }
    
    setupEventListeners() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            let isHoveringAnyCircle = false;
            
            this.circles.forEach(circle => {
                const distance = Math.sqrt(
                    Math.pow(mouseX - circle.x, 2) + Math.pow(mouseY - circle.y, 2)
                );
                
                if (distance <= circle.radius) {
                    isHoveringAnyCircle = true;
                }
            });
            
            if (isHoveringAnyCircle && !this.hovering) {
                this.hovering = true;
                this.playSound();
            } else if (!isHoveringAnyCircle) {
                this.hovering = false;
            }
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.hovering = false;
        });
        
        this.canvas.addEventListener('click', () => {
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
        });
    }
}

window.addEventListener('load', () => {
    new BrailleApp();
});