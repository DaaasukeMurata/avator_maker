document.addEventListener('DOMContentLoaded', function() {
    const avatarGenerator = new AvatarGenerator();
    const form = document.getElementById('avatarForm');
    const avatarResult = document.getElementById('avatarResult');
    const avatarDisplay = document.getElementById('avatarDisplay');
    const downloadBtn = document.getElementById('downloadBtn');
    const regenerateBtn = document.getElementById('regenerateBtn');
    
    let currentSVG = '';
    let currentName = '';
    let currentKeywords = [];

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        generateAvatar();
    });

    regenerateBtn.addEventListener('click', function() {
        generateAvatar();
    });

    downloadBtn.addEventListener('click', function() {
        downloadSVG();
    });

    function generateAvatar() {
        const name = document.getElementById('name').value.trim();
        const keywordsInput = document.getElementById('keywords').value.trim();
        
        if (!name || !keywordsInput) {
            alert('名前とキーワードを入力してください！');
            return;
        }

        currentName = name;
        currentKeywords = keywordsInput.split(',').map(k => k.trim()).filter(k => k);
        
        if (currentKeywords.length === 0) {
            alert('有効なキーワードを入力してください！');
            return;
        }

        // ローディング表示
        avatarDisplay.innerHTML = '<div class="loading"></div><p>アバターを生成中...</p>';
        avatarResult.style.display = 'block';

        // 少し遅延を入れてローディング感を演出
        setTimeout(() => {
            currentSVG = avatarGenerator.generateAvatar(currentName, currentKeywords);
            avatarDisplay.innerHTML = currentSVG;
            
            // アニメーション効果
            const svgElement = avatarDisplay.querySelector('svg');
            if (svgElement) {
                svgElement.style.opacity = '0';
                svgElement.style.transform = 'scale(0.8)';
                svgElement.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    svgElement.style.opacity = '1';
                    svgElement.style.transform = 'scale(1)';
                }, 100);
            }
        }, 800);
    }

    function downloadSVG() {
        if (!currentSVG) {
            alert('まずアバターを生成してください！');
            return;
        }

        const blob = new Blob([currentSVG], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentName}_avatar.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // ダウンロード成功の視覚的フィードバック
        const originalText = downloadBtn.textContent;
        downloadBtn.textContent = 'ダウンロード完了！';
        downloadBtn.style.background = '#28a745';
        
        setTimeout(() => {
            downloadBtn.textContent = originalText;
            downloadBtn.style.background = '';
        }, 2000);
    }

    // エンターキーでフォーム送信
    document.getElementById('name').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateAvatar();
        }
    });

    document.getElementById('keywords').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateAvatar();
        }
    });

    // デモ用のサンプルデータ自動入力（デバッグ用）
    if (window.location.search.includes('demo=true')) {
        document.getElementById('name').value = 'サンプル太郎';
        document.getElementById('keywords').value = '猫,青,メガネ,帽子';
        setTimeout(() => generateAvatar(), 1000);
    }
});