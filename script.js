let health = document.getElementById('health');
let healthText = document.getElementById('health-text');
let armour = document.getElementById('armour');
let armourText = document.getElementById('armour-text');
let moneys = document.getElementById('money');
let wanteds = document.getElementById('wanted');
let guns = document.getElementById('gunid');
let ammos = document.getElementById('ammo');
let backs = document.getElementById('backid');

// Инициализация HUD
cef.emit("game:hud:setComponentVisible", "interface", false);
cef.on("background:id", (back) => {
    backs.src = "../hud/image/background/" + back + ".png";
});

cef.on("game:hud:newVisibleState", (success) => {
    cef.hide(!success);
});

// Запрос данных игрока
cef.emit("game:data:pollPlayerStats", true, 50);
cef.on("game:data:playerStats", (hp, max_hp, arm, breath, wanted, weapon, ammo, max_ammo, money, speed) => {
    // Обновление здоровья
    health.value = hp;
    healthText.textContent = hp + "%";
    
    // Анимация при низком здоровье
    if (hp < 20) {
        health.parentElement.parentElement.classList.add('low-health');
    } else {
        health.parentElement.parentElement.classList.remove('low-health');
    }
    
    // Обновление брони
    armour.value = arm;
    armourText.textContent = arm + "%";
    
    // Обновление денег
    moneys.textContent = "$" + money.toLocaleString();
    
    // Обновление оружия
    guns.src = "../hud/image/guns/" + weapon + ".png";
    
    // Обновление уровня розыска
    if (wanted > 10) wanted = 10;
    wanteds.src = "../hud/image/wanted/wanted-" + wanted + ".png";
    
    // Обновление боеприпасов
    if (weapon == 0) {
        ammos.textContent = "";
        guns.style.opacity = "0.3";
    } else {
        ammos.textContent = ammo + "/" + max_ammo;
        guns.style.opacity = "1";
    }
});

// Дополнительные функции для HUD
cef.on("game:hud:updateLocation", (location) => {
    document.querySelector('.location-text').textContent = location;
});

cef.on("game:hud:showNotification", (message, type) => {
    // Функция для показа уведомлений (можно реализовать позже)
    console.log("Notification:", message, type);
});

// Обработка ошибок загрузки изображений
guns.onerror = function() {
    this.src = "../hud/image/guns/0.png";
};

wanteds.onerror = function() {
    this.src = "../hud/image/wanted/wanted-0.png";
};

backs.onerror = function() {
    this.src = "../hud/image/background/default.png";
};