if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');

            if (registration.installing) {
                console.log("Service worker installing");
            } else if (registration.waiting) {
                console.log("Service worker installed");
            } else if (registration.active) {
                console.log("Service worker active");
            }

            registration.addEventListener('updatefound', () => {
                console.log('🔄 Service Worker обновлен');
                // window.location.reload();
            });
        } catch (error) {
            console.error('Ошибка регистрации Service Worker:', error);
        }
    });
}

function initCount() {
    var count = localStorage.getItem("counter") || 0
    var counterHTML = document.querySelector("#counter")
    counterHTML.innerText = count
}


function count() {
    var coutnerHtml = document.querySelector("#counter")
    var count = (Number(coutnerHtml.innerText) || 0) + 1
    coutnerHtml.innerText = count
    localStorage.setItem("counter", count)

}


// function updateOnlineStatus(online) {
//     const statusElement = document.getElementById('onlineStatus') || createStatusElement();
//     statusElement.textContent = online ? '✅ Онлайн' : '❌ Офлайн';
//     statusElement.style.background = online ? '#4CAF50' : '#ff9800';
// }

// function createStatusElement() {
//     const statusElement = document.createElement('div');
//     statusElement.id = 'onlineStatus';
//     statusElement.style.cssText = `
//         position: fixed;
//         top: 10px;
//         right: 10px;
//         padding: 5px 10px;
//         border-radius: 15px;
//         color: white;
//         font-size: 12px;
//         z-index: 1000;
//     `;
//     document.body.appendChild(statusElement);
//     return statusElement;
// }

// function showNotification(message, type = 'info') {
//     const notification = document.createElement('div');
//     notification.textContent = message;
//     notification.style.cssText = `
//         position: fixed;
//         top: 20px;
//         left: 50%;
//         transform: translateX(-50%);
//         padding: 10px 20px;
//         border-radius: 5px;
//         color: white;
//         z-index: 1000;
//         background: ${type === 'success' ? '#4CAF50' : type === 'warning' ? '#ff9800' : '#2196F3'};
//     `;

//     document.body.appendChild(notification);

//     setTimeout(() => {
//         notification.remove();
//     }, 3000);
// }

// const storage = {
//     set: (key, value) => {
//         try {
//             localStorage.setItem(key, JSON.stringify(value));
//             return true;
//         } catch (error) {
//             console.error('❌ Ошибка сохранения:', error);
//             return false;
//         }
//     },

//     get: (key) => {
//         try {
//             const item = localStorage.getItem(key);
//             return item ? JSON.parse(item) : null;
//         } catch (error) {
//             console.error('❌ Ошибка чтения:', error);
//             return null;
//         }
//     },

//     remove: (key) => {
//         try {
//             localStorage.removeItem(key);
//             return true;
//         } catch (error) {
//             console.error('❌ Ошибка удаления:', error);
//             return false;
//         }
//     }
// };

// function saveData() {
//     const data = {
//         timestamp: new Date().toISOString(),
//         content: document.querySelector('input')?.value || 'Тестовые данные'
//     };

//     if (storage.set('offlineData', data)) {
//         showNotification('Данные сохранены локально', 'success');
//     }
// }


document.addEventListener('DOMContentLoaded', () => {
    initCount()

    // console.log('🚀 PWA инициализировано');
    // updateOnlineStatus(navigator.onLine);

    // if (!document.getElementById('demoButtons')) {
    //     const demoHTML = `
    //         <div id="demoButtons" style="margin: 20px; text-align: center;">
    //             <button onclick="saveData()" style="margin: 5px;">💾 Сохранить данные</button>
    //             <button onclick="loadData()" style="margin: 5px;">📂 Загрузить данные</button>
    //         </div>
    //     `;
    //     document.body.insertAdjacentHTML('beforeend', demoHTML);
    // }
});

window.addEventListener('online', () => {
    console.log('✅ Онлайн');
});

window.addEventListener('offline', () => {
    console.log('❌ Офлайн');
});

console.log('Safe area top:', getComputedStyle(document.documentElement)
    .getPropertyValue('env(safe-area-inset-top)'));