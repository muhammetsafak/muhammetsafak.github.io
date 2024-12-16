$(document).ready(function () {
    const canvas = $('#snowCanvas')[0];
    const ctx = canvas.getContext('2d');
    const snowflakes = [];
    const snowmen = [];
    const maxSnowmen = 2; // Maksimum 6 kardan adam
    const ground = []; // Zemin birikimi için
    const speed = 1.5;
    const intensity = 0.7;
    let isSnowing = true;
    let maxHeight = 0;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const groundWidth = 10;
    const groundHeight = Array(Math.ceil(canvas.width / groundWidth)).fill(0);


    // Zemin birikimini kontrol et
    function isGroundFilled() {
        maxHeight = Math.max(...groundHeight);

        return maxHeight > 40;
    }

    // Kar tanesi oluştur
    function createSnowflake() {
        return {
            x: (Math.random() * (canvas.width + 20)) - 10,
            y: -10,
            radius: Math.random() * 2 + 1, // Boyut aralığı: 1 - 3
            speed: Math.random() * (speed < 1 ? 1 : speed) + 0.6,
            opacity: Math.random() * 0.5 + 0.3
        };
    }

    // Kristal çizimi
    function drawCrystal(ctx, x, y, radius, opacity) {
        const sides = 6; // Altıgen
        const angleStep = (Math.PI * 2) / sides;

        // Dış altıgen çizgisi
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const angle = i * angleStep;
            const x1 = x + radius * Math.cos(angle);
            const y1 = y + radius * Math.sin(angle);

            if (i === 0) {
                ctx.moveTo(x1, y1);
            } else {
                ctx.lineTo(x1, y1);
            }
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // İç çizgiler
        for (let i = 0; i < sides; i++) {
            const angle = i * angleStep;
            const x1 = x + radius * Math.cos(angle);
            const y1 = y + radius * Math.sin(angle);

            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x1, y1);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.7})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
    }

    // Kar yağışı ve birikme
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Yeni kar tanesi ekle
        if (snowflakes.length < 300 && Math.random() < intensity) {
            snowflakes.push(createSnowflake());
        }

        // Kar tanesi hareketi
        snowflakes.forEach((flake, index) => {
            flake.y += flake.speed;
            if (flake.x < 0 || flake.x > canvas.width) {
                flake.x = Math.random() * canvas.width; // Yeni pozisyon oluştur
            }
            flake.x += Math.sin(flake.y / 50) * 2;

            // Kar tanesini kristal olarak çiz
            drawCrystal(ctx, flake.x, flake.y, flake.radius, flake.opacity);

            // Kar tanesi yere ulaştığında
            if (flake.y > canvas.height - 5) {
                snowflakes.splice(index, 1);

                if (isSnowing === true) {
                    if (snowmen.length < maxSnowmen && Math.random() < 0.002 && maxHeight >= 20) {
                        const size = Math.random() * 10 + 30;
                        createSnowman(flake.x, canvas.height - size, size);
                    } else {
                        addToGround(flake.x, flake.radius);
                    }
                }
            }
        });

        // Kardan adam çizimi
        snowmen.forEach(snowman => {
            drawSnowman(ctx, snowman);
        });

        // Zemin birikimini çiz
        ground.forEach(pile => {
            ctx.beginPath();
            ctx.arc(pile.x, canvas.height - pile.height, pile.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        });

        // Zemin doluluk kontrolü
        if (isGroundFilled()) {
            isSnowing = false; // Çizimi Durdur
        }

        requestAnimationFrame(draw);
    }



// Kardan adam oluştur
    function createSnowman(x, baseY, baseSize) {
        const parts = [];
        for (let i = 0; i < 3; i++) {
            parts.push({
                x,
                y: baseY - i * (baseSize / 1.5),
                radius: baseSize / (1 + i * 0.5)
            });
        }
        snowmen.push({ parts });
    }

// Kardan adamı çiz
    function drawSnowman(ctx, snowman) {
        const [bottom, middle, head] = snowman.parts;

        // Alt, orta ve baş parçalarını çiz
        snowman.parts.forEach(part => {
            ctx.beginPath();
            ctx.arc(part.x, part.y, part.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'white';
            ctx.fill();
        });

        // Gözler
        const eyeOffsetX = head.radius / 3;
        const eyeOffsetY = head.radius / 3;
        ctx.beginPath();
        ctx.arc(head.x - eyeOffsetX, head.y - eyeOffsetY, head.radius / 10, 0, Math.PI * 2); // Sol göz
        ctx.arc(head.x + eyeOffsetX, head.y - eyeOffsetY, head.radius / 10, 0, Math.PI * 2); // Sağ göz
        ctx.fillStyle = 'black';
        ctx.fill();

        // Burun (havucu temsil eden üçgen)
        ctx.beginPath();
        ctx.moveTo(head.x, head.y);
        ctx.lineTo(head.x + head.radius / 2, head.y); // Uç kısmı
        ctx.lineTo(head.x, head.y + head.radius / 6); // Alt kısmı
        ctx.closePath();
        ctx.fillStyle = 'orange';
        ctx.fill();

        // Şapka
        const hatWidth = head.radius * 1.2;
        const hatHeight = head.radius / 3;
        ctx.beginPath();
        ctx.rect(head.x - hatWidth / 2, head.y - head.radius - hatHeight, hatWidth, hatHeight); // Şapka tabanı
        ctx.fillStyle = 'black';
        ctx.fill();

        // Şapka üst kısmı
        const hatTopWidth = head.radius;
        const hatTopHeight = head.radius / 2;
        ctx.beginPath();
        ctx.rect(head.x - hatTopWidth / 2, head.y - head.radius - hatHeight - hatTopHeight, hatTopWidth, hatTopHeight);
        ctx.fillStyle = 'black';
        ctx.fill();

        // Kollar
        const armLength = middle.radius * 1.5;
        ctx.beginPath();
        ctx.moveTo(middle.x - middle.radius, middle.y); // Sol kol başlangıcı
        ctx.lineTo(middle.x - middle.radius - armLength, middle.y - middle.radius / 2); // Sol kol ucu
        ctx.moveTo(middle.x + middle.radius, middle.y); // Sağ kol başlangıcı
        ctx.lineTo(middle.x + middle.radius + armLength, middle.y - middle.radius / 2); // Sağ kol ucu
        ctx.strokeStyle = 'brown';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Kar zeminine birikim ekle
    function addToGround(x, radius) {
        // Var olan birikime ekleme
        let found = false;
        radius = radius / 2;
        const index = Math.floor(x / groundWidth)
        if (index >= 0 && index < groundHeight.length) {
            groundHeight[index] += radius;
        }
        for (let pile of ground) {
            if (Math.abs(pile.x - x) < 10) {
                pile.radius += radius * 0.5;
                pile.height += radius * 0.2;
                found = true;
                break;
            }
        }
        // Yeni birikim noktası ekle
        if (!found) {
            ground.push({
                x,
                radius,
                height: radius
            });
        }
    }

    // Ekran yeniden boyutlandırıldığında
    $(window).resize(function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    draw();
});
