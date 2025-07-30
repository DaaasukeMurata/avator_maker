class AvatarGenerator {
    constructor() {
        this.colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
            '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
        ];
        
        this.hairStyles = [
            'curly', 'straight', 'wavy', 'short', 'long', 'spiky'
        ];
        
        this.accessories = [
            'glasses', 'hat', 'earrings', 'necklace', 'none'
        ];
        
        this.expressions = [
            'happy', 'serious', 'wink', 'surprised', 'cool'
        ];
    }

    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    getRandomFromSeed(array, seed) {
        const index = seed % array.length;
        return array[index];
    }

    generateAvatar(name, keywords) {
        const seed = this.hashString(name + keywords.join(''));
        const keywordHash = keywords.map(k => this.hashString(k)).reduce((a, b) => a + b, 0);
        
        const skinColor = this.getRandomFromSeed(this.colors, seed);
        const hairColor = this.getRandomFromSeed(this.colors, seed + 1);
        const hairStyle = this.getRandomFromSeed(this.hairStyles, seed + 2);
        const accessory = this.getRandomFromSeed(this.accessories, keywordHash);
        const expression = this.getRandomFromSeed(this.expressions, seed + 3);
        const eyeColor = this.getRandomFromSeed(this.colors, seed + 4);
        
        return this.createSVG(name, {
            skinColor,
            hairColor,
            hairStyle,
            accessory,
            expression,
            eyeColor
        });
    }

    createSVG(name, attributes) {
        const svg = `
        <svg width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <!-- Background Circle -->
            <circle cx="150" cy="150" r="140" fill="url(#bgGradient)" stroke="#fff" stroke-width="8"/>
            
            <!-- Gradient Definitions -->
            <defs>
                <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#667eea;stop-opacity:0.8" />
                    <stop offset="100%" style="stop-color:#764ba2;stop-opacity:0.8" />
                </linearGradient>
                
                <linearGradient id="faceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${attributes.skinColor};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${this.darkenColor(attributes.skinColor, 20)};stop-opacity:1" />
                </linearGradient>
            </defs>
            
            <!-- Face -->
            <ellipse cx="150" cy="160" rx="80" ry="90" fill="url(#faceGradient)" stroke="#333" stroke-width="2"/>
            
            <!-- Hair -->
            ${this.generateHair(attributes.hairStyle, attributes.hairColor)}
            
            <!-- Eyes -->
            ${this.generateEyes(attributes.expression, attributes.eyeColor)}
            
            <!-- Nose -->
            <ellipse cx="150" cy="170" rx="8" ry="12" fill="${this.darkenColor(attributes.skinColor, 30)}" opacity="0.6"/>
            
            <!-- Mouth -->
            ${this.generateMouth(attributes.expression)}
            
            <!-- Accessories -->
            ${this.generateAccessory(attributes.accessory)}
            
            <!-- Name Label -->
            <rect x="50" y="260" width="200" height="30" rx="15" fill="rgba(255,255,255,0.9)" stroke="#333" stroke-width="1"/>
            <text x="150" y="280" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#333">${name}</text>
        </svg>`;
        
        return svg;
    }

    generateHair(style, color) {
        const baseHair = `<ellipse cx="150" cy="120" rx="85" ry="60" fill="${color}" stroke="#333" stroke-width="2"/>`;
        
        switch(style) {
            case 'curly':
                return baseHair + `
                    <circle cx="120" cy="100" r="15" fill="${color}" stroke="#333" stroke-width="1"/>
                    <circle cx="150" cy="90" r="18" fill="${color}" stroke="#333" stroke-width="1"/>
                    <circle cx="180" cy="100" r="15" fill="${color}" stroke="#333" stroke-width="1"/>
                `;
            case 'spiky':
                return baseHair + `
                    <polygon points="130,80 140,60 150,80" fill="${color}" stroke="#333" stroke-width="1"/>
                    <polygon points="145,75 155,55 165,75" fill="${color}" stroke="#333" stroke-width="1"/>
                    <polygon points="160,80 170,60 180,80" fill="${color}" stroke="#333" stroke-width="1"/>
                `;
            case 'long':
                return baseHair + `
                    <ellipse cx="110" cy="180" rx="20" ry="40" fill="${color}" stroke="#333" stroke-width="1"/>
                    <ellipse cx="190" cy="180" rx="20" ry="40" fill="${color}" stroke="#333" stroke-width="1"/>
                `;
            default:
                return baseHair;
        }
    }

    generateEyes(expression, eyeColor) {
        const leftEye = { x: 130, y: 150 };
        const rightEye = { x: 170, y: 150 };
        
        switch(expression) {
            case 'wink':
                return `
                    <ellipse cx="${leftEye.x}" cy="${leftEye.y}" rx="12" ry="8" fill="white" stroke="#333" stroke-width="2"/>
                    <circle cx="${leftEye.x}" cy="${leftEye.y}" r="6" fill="${eyeColor}"/>
                    <circle cx="${leftEye.x + 2}" cy="${leftEye.y - 2}" r="2" fill="white"/>
                    <path d="M ${rightEye.x - 10} ${rightEye.y} Q ${rightEye.x} ${rightEye.y - 5} ${rightEye.x + 10} ${rightEye.y}" stroke="#333" stroke-width="3" fill="none"/>
                `;
            case 'surprised':
                return `
                    <circle cx="${leftEye.x}" cy="${leftEye.y}" r="15" fill="white" stroke="#333" stroke-width="2"/>
                    <circle cx="${leftEye.x}" cy="${leftEye.y}" r="8" fill="${eyeColor}"/>
                    <circle cx="${leftEye.x + 2}" cy="${leftEye.y - 2}" r="2" fill="white"/>
                    
                    <circle cx="${rightEye.x}" cy="${rightEye.y}" r="15" fill="white" stroke="#333" stroke-width="2"/>
                    <circle cx="${rightEye.x}" cy="${rightEye.y}" r="8" fill="${eyeColor}"/>
                    <circle cx="${rightEye.x + 2}" cy="${rightEye.y - 2}" r="2" fill="white"/>
                `;
            default:
                return `
                    <ellipse cx="${leftEye.x}" cy="${leftEye.y}" rx="12" ry="8" fill="white" stroke="#333" stroke-width="2"/>
                    <circle cx="${leftEye.x}" cy="${leftEye.y}" r="6" fill="${eyeColor}"/>
                    <circle cx="${leftEye.x + 2}" cy="${leftEye.y - 2}" r="2" fill="white"/>
                    
                    <ellipse cx="${rightEye.x}" cy="${rightEye.y}" rx="12" ry="8" fill="white" stroke="#333" stroke-width="2"/>
                    <circle cx="${rightEye.x}" cy="${rightEye.y}" r="6" fill="${eyeColor}"/>
                    <circle cx="${rightEye.x + 2}" cy="${rightEye.y - 2}" r="2" fill="white"/>
                `;
        }
    }

    generateMouth(expression) {
        switch(expression) {
            case 'happy':
                return `<path d="M 130 190 Q 150 210 170 190" stroke="#333" stroke-width="3" fill="none"/>`;
            case 'surprised':
                return `<ellipse cx="150" cy="195" rx="8" ry="12" fill="#333"/>`;
            case 'serious':
                return `<line x1="135" y1="195" x2="165" y2="195" stroke="#333" stroke-width="3"/>`;
            default:
                return `<path d="M 130 195 Q 150 205 170 195" stroke="#333" stroke-width="3" fill="none"/>`;
        }
    }

    generateAccessory(accessory) {
        switch(accessory) {
            case 'glasses':
                return `
                    <ellipse cx="130" cy="150" rx="18" ry="15" fill="none" stroke="#333" stroke-width="3"/>
                    <ellipse cx="170" cy="150" rx="18" ry="15" fill="none" stroke="#333" stroke-width="3"/>
                    <line x1="148" y1="150" x2="152" y2="150" stroke="#333" stroke-width="3"/>
                    <line x1="112" y1="145" x2="105" y2="140" stroke="#333" stroke-width="2"/>
                    <line x1="188" y1="145" x2="195" y2="140" stroke="#333" stroke-width="2"/>
                `;
            case 'hat':
                return `
                    <ellipse cx="150" cy="85" rx="70" ry="15" fill="#333"/>
                    <rect x="100" y="70" width="100" height="25" rx="5" fill="#666"/>
                `;
            case 'earrings':
                return `
                    <circle cx="95" cy="160" r="4" fill="#FFD700" stroke="#333" stroke-width="1"/>
                    <circle cx="205" cy="160" r="4" fill="#FFD700" stroke="#333" stroke-width="1"/>
                `;
            default:
                return '';
        }
    }

    darkenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
}