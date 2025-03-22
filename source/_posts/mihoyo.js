// ==UserScript==
// @name         Mihoyo, NetEase, Bilibili Custom Scripts
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Custom scripts for Mihoyo, NetEase, and Bilibili websites
// @author       Your Name
// @match        https://*.mihoyo.com/cloud/*
// @match        https://cg.163.com/*
// @match        https://*.bilibili.com/video/*
// @match        https://*.bilibili.com/agency/warning
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 根据不同的网址执行不同的功能
    if (window.location.hostname.includes('mihoyo.com')) {
        mihoyo();
    } else if (window.location.hostname.includes('163.com')) {
        NetEaseCloudGame();
    } else if (window.location.hostname.includes('bilibili.com')) {
        // 判断是正常页面还是警告页面
        if (window.location.pathname.includes('/agency/warning')) {
            bilibiliFakePage();
        } else {
            bilibili();
        }
    }

    function mihoyo() {
        const iframeInterval = setInterval(() => {
            const iframe = document.getElementById('mihoyo-login-platform-iframe');
            if (iframe) {
                iframe.remove();
                clearInterval(iframeInterval); // 停止计时器
                return;
            }
        }, 1000);

        function showPopup(message) {
            const popup = document.createElement('div');
            popup.className = 'mihoyo-popup';
            popup.textContent = message;

            popup.style.position = 'fixed';
            popup.style.top = '27%';
            popup.style.left = '50%';
            popup.style.transform = 'translateX(-50%)';
            popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            popup.style.color = 'white';
            popup.style.padding = '10px 20px';
            popup.style.borderRadius = '12px';
            popup.style.zIndex = '1000';
            popup.style.transition = 'opacity 1.5s, top 1s';
            popup.style.opacity = '0';
            popup.style.fontSize = '18px';
            popup.style.backdropFilter = 'blur(.5rem)';

            document.body.appendChild(popup);

            setTimeout(() => {
                popup.style.opacity = '1';
                popup.style.top = '25%';
            }, 1000);

            setTimeout(() => {
                popup.style.opacity = '0';
                popup.style.top = '23%';
                setTimeout(() => {
                    popup.remove();
                }, 1500);
            }, 4000);
        }

        setTimeout(() => {
            showPopup('服务器维护中，请稍后再试（40100）');
        }, 1500);
    }

    function NetEaseCloudGame() {
        function showPopup() {
            const popup = document.createElement('networkErrorPopup');

            popup.className = "toast";
            popup.innerHTML = "您的网络近期存在频繁登录行为，已被限制登录，请稍后再试。";
            popup.style.color = "#ffffff";
            popup.zIndex = 9999;
            popup.style.position = "fixed";
            popup.style.left = "50%";
            popup.style.top = "85%";
            popup.style.transform = "translate(-50%,-50%)";
            popup.style.padding = "20px 60px 20px 60px";
            popup.style.background = "#304051";
            popup.style.borderRadius = "6px";
            popup.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
            popup.style.fontSize = "12px";
            popup.style.transition = "opacity 0.8s";
            popup.style.opacity = "0";

            document.body.appendChild(popup);

            setTimeout(() => { popup.style.opacity = '1'; }, 1000);

            setTimeout(() => {
                popup.style.opacity = '0';
                setTimeout(() => {
                    popup.remove();
                }, 800);
            }, 3000);
        }

        function addListener() {
            const parentButton = document.querySelector('.g-Btn');
            if (parentButton && parentButton.innerText === '登录') {
                parentButton.addEventListener('click', () => {
                    const inputs = document.querySelectorAll('input');
                    inputs.forEach(input => {
                        if (input.placeholder === '请输入手机号码' || input.placeholder === '请输入验证码' || input.placeholder === '请输入密码') {
                            input.readOnly = true;
                            input.placeholder = '登录受限';
                            return;
                        }
                    });

                    const buttons = document.querySelectorAll('.g-Btn');
                    buttons.forEach(button => {
                        if (button.innerText === '下一步') {
                            const newButton = button.cloneNode(true);
                            button.parentNode.replaceChild(newButton, button);
                            newButton.addEventListener('click', () => {
                                showPopup();
                            });
                            return;
                        }
                    });
                });
            }
        }

        const waitButtons = setInterval(() => {
            const buttons = document.querySelectorAll('.g-Btn');
            if (buttons) {
                clearInterval(waitButtons);
                addListener();
                return;
            }
        }, 800);
    }

    function bilibili() {
        const blank = document.createElement('div');
        blank.style.width = '100%';
        blank.style.height = '100%';
        blank.style.backgroundColor = 'white';
        blank.style.position = 'fixed';
        blank.style.top = '0';
        blank.style.left = '0';
        blank.style.zIndex = '9999';
        document.body.appendChild(blank);

        const blackList = ['原神', '米哈游', '崩坏：星穹铁道', '崩铁', '绝区零', '崩坏3', '明日方舟', '崩坏星穹铁道', '王者荣耀', '英雄联盟', '绝地求生', '和平精英', '荒野乱斗', '刺激战场', '穿越火线', '逆水寒', '鸣潮', '火影忍者', '第五人格', '崩坏：星穹铁道创作者激励计划', '原神创作者激励计划'];

        const tags = document.querySelectorAll('.tag-link');
        for (const tag of tags) {
            if (blackList.includes(tag.innerText)) {
                window.location.href = 'https://www.bilibili.com/agency/warning';
            }
        }

        setTimeout(() => {
            document.body.removeChild(blank);
        }, 500);
    }

    function bilibiliFakePage() {
        const blank = document.createElement('div');
        blank.style.width = '100%';
        blank.style.height = '100%';
        blank.style.backgroundColor = 'white';
        blank.style.position = 'fixed';
        blank.style.top = '0';
        blank.style.left = '0';
        blank.style.zIndex = '9999';
        document.body.appendChild(blank);

        document.title = '机构内容限制 - 哔哩哔哩 (゜-゜)つロ 干杯~';

        const img = document.querySelector('.error-panel.server-error.error-404 img');
        img.remove();

        setTimeout(() => {
            document.body.removeChild(blank);
        }, 500);

        async function getPublicIP() {
            try {
                return '10.1.43.231';
            } catch (error) {
                return '10.1.43.231';
            }
        }

        getPublicIP().then(ip => {
            const errorMsg = document.createElement('div');
            errorMsg.innerHTML = '您所属 IP 地址<span style="color: #00a1d6; font-weight: bold;"> ' + ip + ' </span>的机构管理员已配置访问限制。';
            errorMsg.style.textAlign = 'center';
            errorMsg.style.fontSize = '24px';
            errorMsg.style.padding = '40px 0 40px 0';

            const errorPanel = document.querySelector('.error-panel.server-error.error-404');
            errorPanel.insertBefore(errorMsg, errorPanel.firstChild);
        });

        const btn = document.querySelector('.rollback-btn');
        btn.onclick = function() {
            window.location.href = 'https://www.bilibili.com';
        };
        btn.innerHTML = '返回首页';
    }
})();