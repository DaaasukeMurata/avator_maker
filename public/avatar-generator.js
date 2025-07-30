class AvatarGenerator {
    constructor() {
        // よりリアルな肌色のパレット
        this.skinColors = [
            '#FDBCB4', '#EEA990', '#D08B5B', '#AE7242', '#8D5524',
            '#C68642', '#E0AC69', '#F1C27D', '#FFDBAC', '#F4C2A1'
        ];
        
        // より自然な髪色
        this.hairColors = [
            '#2C1B18', '#3D2314', '#5D4037', '#8D6E63', '#A1887F',
            '#D7CCC8', '#F5F5DC', '#FFE4B5', '#DEB887', '#CD853F',
            '#B8860B', '#DAA520', '#FF4500', '#8B0000', '#4B0082'
        ];
        
        this.hairStyles = [
            'curly', 'straight', 'wavy', 'short', 'long', 'spiky', 'bob', 'pixie', 'ponytail', 'braided'
        ];
        
        this.accessories = [
            'glasses', 'sunglasses', 'hat', 'cap', 'earrings', 'necklace', 'scarf', 'headband', 'none'
        ];
        
        this.expressions = [
            'happy', 'serious', 'wink', 'surprised', 'cool', 'smiling', 'thoughtful', 'confident'
        ];
        
        // 自然な目の色
        this.eyeColors = [
            '#8B4513', '#A0522D', '#654321', '#2F4F4F', '#556B2F',
            '#4682B4', '#5F9EA0', '#6495ED', '#87CEEB', '#32CD32'
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
        
        const skinColor = this.getRandomFromSeed(this.skinColors, seed);
        const hairColor = this.getRandomFromSeed(this.hairColors, seed + 1);
        const hairStyle = this.getRandomFromSeed(this.hairStyles, seed + 2);
        const accessory = this.getRandomFromSeed(this.accessories, keywordHash);
        const expression = this.getRandomFromSeed(this.expressions, seed + 3);
        const eyeColor = this.getRandomFromSeed(this.eyeColors, seed + 4);
        const faceShape = this.getRandomFromSeed(['oval', 'round', 'square', 'heart'], seed + 5);
        
        return this.createSVG(name, {
            skinColor,
            hairColor,
            hairStyle,
            accessory,
            expression,
            eyeColor,
            faceShape
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
                    <stop offset="0%" style="stop-color:${this.lightenColor(attributes.skinColor, 10)};stop-opacity:1" />
                    <stop offset="50%" style="stop-color:${attributes.skinColor};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${this.darkenColor(attributes.skinColor, 15)};stop-opacity:1" />
                </linearGradient>
                
                <radialGradient id="cheekGradient" cx="50%" cy="50%">
                    <stop offset="0%" style="stop-color:${this.darkenColor(attributes.skinColor, 10)};stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:${attributes.skinColor};stop-opacity:0" />
                </radialGradient>
                
                <filter id="softShadow">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                    <feOffset dx="2" dy="2" result="offset"/>
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="0.3"/>
                    </feComponentTransfer>
                    <feMerge> 
                        <feMergeNode/>
                        <feMergeNode in="SourceGraphic"/> 
                    </feMerge>
                </filter>
            </defs>
            
            <!-- Face with realistic shading -->
            ${this.generateFace(attributes.faceShape, attributes.skinColor)}
            
            <!-- Hair -->
            ${this.generateHair(attributes.hairStyle, attributes.hairColor)}
            
            <!-- Eyes -->
            ${this.generateEyes(attributes.expression, attributes.eyeColor)}
            
            <!-- More realistic nose -->
            ${this.generateNose(attributes.skinColor)}
            
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
        const shadowColor = this.darkenColor(color, 25);
        const highlightColor = this.lightenColor(color, 15);
        
        switch(style) {
            case 'curly':
                return `
                    <!-- Base curly hair -->
                    <ellipse cx="150" cy="115" rx="85" ry="55" fill="${shadowColor}"/>
                    <ellipse cx="150" cy="112" rx="83" ry="52" fill="${color}"/>
                    <!-- Curly details -->
                    <circle cx="110" cy="95" r="18" fill="${color}"/>
                    <circle cx="135" cy="85" r="22" fill="${highlightColor}"/>
                    <circle cx="165" cy="85" r="22" fill="${color}"/>
                    <circle cx="190" cy="95" r="18" fill="${shadowColor}"/>
                    <circle cx="120" cy="110" r="12" fill="${highlightColor}"/>
                    <circle cx="180" cy="110" r="12" fill="${color}"/>
                `;
            case 'straight':
                return `
                    <!-- Straight hair with layers -->
                    <ellipse cx="150" cy="115" rx="85" ry="55" fill="${shadowColor}"/>
                    <ellipse cx="150" cy="112" rx="83" ry="52" fill="${color}"/>
                    <ellipse cx="148" cy="110" rx="80" ry="48" fill="${highlightColor}" opacity="0.7"/>
                    <!-- Hair strands -->
                    <rect x="70" y="100" width="3" height="40" fill="${shadowColor}" opacity="0.6"/>
                    <rect x="80" y="95" width="2" height="45" fill="${color}"/>
                    <rect x="220" y="95" width="2" height="45" fill="${color}"/>
                    <rect x="227" y="100" width="3" height="40" fill="${shadowColor}" opacity="0.6"/>
                `;
            case 'wavy':
                return `
                    <!-- Wavy hair base -->
                    <ellipse cx="150" cy="115" rx="85" ry="55" fill="${shadowColor}"/>
                    <ellipse cx="150" cy="112" rx="83" ry="52" fill="${color}"/>
                    <!-- Wave pattern -->
                    <path d="M 70 120 Q 90 100 110 120 Q 130 140 150 120 Q 170 100 190 120 Q 210 140 230 120" 
                          stroke="${highlightColor}" stroke-width="4" fill="none" opacity="0.8"/>
                    <path d="M 75 110 Q 95 90 115 110 Q 135 130 155 110 Q 175 90 195 110 Q 215 130 225 110" 
                          stroke="${shadowColor}" stroke-width="3" fill="none" opacity="0.6"/>
                `;
            case 'short':
                return `
                    <!-- Short pixie cut -->
                    <ellipse cx="150" cy="125" rx="75" ry="45" fill="${shadowColor}"/>
                    <ellipse cx="150" cy="123" rx="73" ry="43" fill="${color}"/>
                    <ellipse cx="148" cy="121" rx="70" ry="40" fill="${highlightColor}" opacity="0.6"/>
                    <!-- Side swept bangs -->
                    <path d="M 85 130 Q 120 100 155 125" stroke="${color}" stroke-width="8" fill="none"/>
                `;
            case 'long':
                return `
                    <!-- Long flowing hair -->
                    <ellipse cx="150" cy="115" rx="85" ry="55" fill="${shadowColor}"/>
                    <ellipse cx="150" cy="112" rx="83" ry="52" fill="${color}"/>
                    <!-- Long side strands -->
                    <ellipse cx="100" cy="180" rx="25" ry="50" fill="${shadowColor}"/>
                    <ellipse cx="200" cy="180" rx="25" ry="50" fill="${shadowColor}"/>
                    <ellipse cx="102" cy="175" rx="22" ry="45" fill="${color}"/>
                    <ellipse cx="198" cy="175" rx="22" ry="45" fill="${color}"/>
                    <ellipse cx="105" cy="170" rx="18" ry="40" fill="${highlightColor}" opacity="0.7"/>
                    <ellipse cx="195" cy="170" rx="18" ry="40" fill="${highlightColor}" opacity="0.7"/>
                `;
            case 'spiky':
                return `
                    <!-- Spiky hair base -->
                    <ellipse cx="150" cy="125" rx="80" ry="50" fill="${shadowColor}"/>
                    <ellipse cx="150" cy="123" rx="78" ry="48" fill="${color}"/>
                    <!-- Spikes -->
                    <polygon points="120,85 130,55 140,85" fill="${highlightColor}"/>
                    <polygon points="135,80 145,45 155,80" fill="${color}"/>
                    <polygon points="150,85 160,50 170,85" fill="${highlightColor}"/>
                    <polygon points="165,80 175,45 185,80" fill="${color}"/>
                    <polygon points="180,85 190,55 200,85" fill="${shadowColor}"/>
                `;
            case 'bob':
                return `
                    <!-- Bob haircut -->
                    <ellipse cx="150" cy="120" rx="82" ry="58" fill="${shadowColor}"/>
                    <ellipse cx="150" cy="118" rx="80" ry="55" fill="${color}"/>
                    <ellipse cx="148" cy="116" rx="77" ry="52" fill="${highlightColor}" opacity="0.6"/>
                    <!-- Clean bob line -->
                    <rect x="68" y="162" width="164" height="4" fill="${shadowColor}"/>
                `;
            case 'pixie':
                return `
                    <!-- Pixie cut -->
                    <ellipse cx="150" cy="130" rx="70" ry="40" fill="${shadowColor}"/>
                    <ellipse cx="150" cy="128" rx="68" ry="38" fill="${color}"/>
                    <ellipse cx="148" cy="126" rx="65" ry="35" fill="${highlightColor}" opacity="0.7"/>
                    <!-- Textured layers -->
                    <circle cx="120" cy="120" r="8" fill="${highlightColor}" opacity="0.8"/>
                    <circle cx="180" cy="120" r="8" fill="${highlightColor}" opacity="0.8"/>
                `;
            case 'ponytail':
                return `
                    <!-- Hair base -->
                    <ellipse cx="150" cy="115" rx="75" ry="50" fill="${shadowColor}"/>
                    <ellipse cx="150" cy="113" rx="73" ry="48" fill="${color}"/>
                    <!-- Ponytail -->
                    <ellipse cx="155" cy="110" rx="20" ry="8" fill="${shadowColor}"/>
                    <ellipse cx="175" cy="130" rx="12" ry="35" fill="${color}"/>
                    <ellipse cx="177" cy="125" rx="10" ry="30" fill="${highlightColor}" opacity="0.7"/>
                    <!-- Hair tie -->
                    <rect x="150" y="108" width="10" height="4" rx="2" fill="#8B4513"/>
                `;
            case 'braided':
                return `
                    <!-- Hair base -->
                    <ellipse cx="150" cy="115" rx="80" ry="52" fill="${shadowColor}"/>
                    <ellipse cx="150" cy="113" rx="78" ry="50" fill="${color}"/>
                    <!-- Braided sides -->
                    <ellipse cx="95" cy="160" rx="15" ry="40" fill="${color}"/>
                    <ellipse cx="205" cy="160" rx="15" ry="40" fill="${color}"/>
                    <!-- Braid pattern -->
                    <circle cx="95" cy="140" r="6" fill="${highlightColor}"/>
                    <circle cx="95" cy="155" r="6" fill="${shadowColor}"/>
                    <circle cx="95" cy="170" r="6" fill="${highlightColor}"/>
                    <circle cx="205" cy="140" r="6" fill="${highlightColor}"/>
                    <circle cx="205" cy="155" r="6" fill="${shadowColor}"/>
                    <circle cx="205" cy="170" r="6" fill="${highlightColor}"/>
                `;
            default:
                return `
                    <!-- Default straight hair -->
                    <ellipse cx="150" cy="115" rx="85" ry="55" fill="${shadowColor}"/>
                    <ellipse cx="150" cy="112" rx="83" ry="52" fill="${color}"/>
                    <ellipse cx="148" cy="110" rx="80" ry="48" fill="${highlightColor}" opacity="0.5"/>
                `;
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
                    <!-- Modern glasses with realistic details -->
                    <ellipse cx="130" cy="150" rx="20" ry="16" fill="rgba(255,255,255,0.1)" stroke="#2C3E50" stroke-width="2"/>
                    <ellipse cx="170" cy="150" rx="20" ry="16" fill="rgba(255,255,255,0.1)" stroke="#2C3E50" stroke-width="2"/>
                    <!-- Bridge -->
                    <line x1="150" y1="150" x2="150" y2="150" stroke="#2C3E50" stroke-width="3"/>
                    <ellipse cx="150" cy="150" rx="3" ry="2" fill="#2C3E50"/>
                    <!-- Temple arms -->
                    <line x1="110" y1="145" x2="95" y2="140" stroke="#2C3E50" stroke-width="3"/>
                    <line x1="190" y1="145" x2="205" y2="140" stroke="#2C3E50" stroke-width="3"/>
                    <!-- Lens reflections -->
                    <ellipse cx="125" cy="145" rx="6" ry="4" fill="rgba(255,255,255,0.8)" opacity="0.7"/>
                    <ellipse cx="165" cy="145" rx="6" ry="4" fill="rgba(255,255,255,0.8)" opacity="0.7"/>
                `;
            case 'sunglasses':
                return `
                    <!-- Cool sunglasses -->
                    <ellipse cx="130" cy="150" rx="20" ry="16" fill="#1A1A1A" stroke="#333" stroke-width="2"/>
                    <ellipse cx="170" cy="150" rx="20" ry="16" fill="#1A1A1A" stroke="#333" stroke-width="2"/>
                    <!-- Bridge -->
                    <ellipse cx="150" cy="150" rx="3" ry="2" fill="#333"/>
                    <!-- Temple arms -->
                    <line x1="110" y1="145" x2="95" y2="140" stroke="#333" stroke-width="3"/>
                    <line x1="190" y1="145" x2="205" y2="140" stroke="#333" stroke-width="3"/>
                    <!-- Dark lens reflections -->
                    <ellipse cx="125" cy="145" rx="4" ry="3" fill="rgba(255,255,255,0.2)" opacity="0.8"/>
                `;
            case 'hat':
                return `
                    <!-- Stylish cap -->
                    <ellipse cx="150" cy="85" rx="75" ry="12" fill="#2C3E50"/>
                    <ellipse cx="150" cy="83" rx="73" ry="10" fill="#34495E"/>
                    <rect x="95" y="65" width="110" height="20" rx="8" fill="#2C3E50"/>
                    <rect x="97" y="67" width="106" height="16" rx="6" fill="#34495E"/>
                    <!-- Cap visor -->
                    <ellipse cx="150" cy="95" rx="85" ry="8" fill="#1A1A1A"/>
                    <ellipse cx="150" cy="93" rx="83" ry="6" fill="#2C3E50"/>
                `;
            case 'cap':
                return `
                    <!-- Baseball cap -->
                    <ellipse cx="150" cy="88" rx="70" ry="15" fill="#C0392B"/>
                    <rect x="105" y="70" width="90" height="25" rx="8" fill="#E74C3C"/>
                    <!-- Cap visor -->
                    <ellipse cx="150" cy="98" rx="80" ry="10" fill="#A93226"/>
                    <!-- Cap button -->
                    <circle cx="150" cy="78" r="3" fill="#8B1A1A"/>
                `;
            case 'earrings':
                return `
                    <!-- Elegant earrings -->
                    <circle cx="95" cy="160" r="5" fill="#FFD700" stroke="#B8860B" stroke-width="1"/>
                    <circle cx="205" cy="160" r="5" fill="#FFD700" stroke="#B8860B" stroke-width="1"/>
                    <!-- Earring highlights -->
                    <circle cx="93" cy="158" r="2" fill="#FFFF99" opacity="0.8"/>
                    <circle cx="203" cy="158" r="2" fill="#FFFF99" opacity="0.8"/>
                    <!-- Earring posts -->
                    <line x1="95" y1="155" x2="95" y2="165" stroke="#B8860B" stroke-width="1"/>
                    <line x1="205" y1="155" x2="205" y2="165" stroke="#B8860B" stroke-width="1"/>
                `;
            case 'necklace':
                return `
                    <!-- Stylish necklace -->
                    <path d="M 120 210 Q 150 220 180 210" stroke="#FFD700" stroke-width="3" fill="none"/>
                    <path d="M 125 212 Q 150 222 175 212" stroke="#FFFF99" stroke-width="1" fill="none"/>
                    <!-- Pendant -->
                    <ellipse cx="150" cy="225" rx="8" ry="10" fill="#FFD700" stroke="#B8860B" stroke-width="1"/>
                    <ellipse cx="150" cy="223" rx="5" ry="6" fill="#FFFF99" opacity="0.8"/>
                `;
            case 'scarf':
                return `
                    <!-- Cozy scarf -->
                    <ellipse cx="150" cy="215" rx="60" ry="20" fill="#8E44AD"/>
                    <ellipse cx="150" cy="213" rx="58" ry="18" fill="#9B59B6"/>
                    <!-- Scarf pattern -->
                    <rect x="100" y="205" width="100" height="3" fill="#7D3C98" opacity="0.7"/>
                    <rect x="100" y="215" width="100" height="3" fill="#7D3C98" opacity="0.7"/>
                    <rect x="100" y="225" width="100" height="3" fill="#7D3C98" opacity="0.7"/>
                `;
            case 'headband':
                return `
                    <!-- Sporty headband -->
                    <ellipse cx="150" cy="105" rx="85" ry="8" fill="#E67E22"/>
                    <ellipse cx="150" cy="103" rx="83" ry="6" fill="#F39C12"/>
                    <!-- Headband pattern -->
                    <rect x="80" y="100" width="140" height="2" fill="#D35400" opacity="0.8"/>
                    <rect x="80" y="106" width="140" height="2" fill="#D35400" opacity="0.8"/>
                `;
            default:
                return '';
        }
    }

    generateFace(faceShape, skinColor) {
        const baseShape = {
            oval: `<ellipse cx="150" cy="160" rx="80" ry="90" fill="url(#faceGradient)" filter="url(#softShadow)"/>`,
            round: `<circle cx="150" cy="160" r="85" fill="url(#faceGradient)" filter="url(#softShadow)"/>`,
            square: `<rect x="75" y="75" width="150" height="170" rx="25" ry="25" fill="url(#faceGradient)" filter="url(#softShadow)"/>`,
            heart: `<path d="M 150 75 Q 80 75 80 130 Q 80 180 150 245 Q 220 180 220 130 Q 220 75 150 75 Z" fill="url(#faceGradient)" filter="url(#softShadow)"/>`
        };
        
        return baseShape[faceShape] + `
            <!-- Cheek highlights -->
            <ellipse cx="115" cy="175" rx="20" ry="15" fill="url(#cheekGradient)"/>
            <ellipse cx="185" cy="175" rx="20" ry="15" fill="url(#cheekGradient)"/>
        `;
    }

    generateNose(skinColor) {
        return `
            <!-- Nose bridge -->
            <ellipse cx="150" cy="165" rx="6" ry="18" fill="${this.darkenColor(skinColor, 15)}" opacity="0.4"/>
            <!-- Nostrils -->
            <ellipse cx="146" cy="175" rx="3" ry="2" fill="${this.darkenColor(skinColor, 40)}" opacity="0.6"/>
            <ellipse cx="154" cy="175" rx="3" ry="2" fill="${this.darkenColor(skinColor, 40)}" opacity="0.6"/>
            <!-- Nose tip highlight -->
            <ellipse cx="150" cy="170" rx="4" ry="3" fill="${this.lightenColor(skinColor, 20)}" opacity="0.7"/>
        `;
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

    lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R : 255) * 0x10000 +
            (G < 255 ? G : 255) * 0x100 +
            (B < 255 ? B : 255)).toString(16).slice(1);
    }
}