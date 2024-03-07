function controlTheme() {
    // 获取根元素和切换按钮
    let rootElement = document.documentElement; // 注意这里使用 document.documentElement 来获取根元素
    let toggleButton = document.getElementById("toggleTheme-theme");

    // 获取当前的主题值
    let currentTheme = localStorage.getItem("theme");

    // 设置初始主题样式
    if (currentTheme === "dark") {
        rootElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        toggleButton.classList.remove("icon-anse");
        toggleButton.classList.add("icon-liangsemoshi");
    } else {
        rootElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        toggleButton.classList.remove("icon-liangsemoshi");
        toggleButton.classList.add("icon-anse");
    }

    // 添加点击事件监听器来切换主题
    toggleButton.addEventListener("click", function () {
        // 获取当前的主题值
        let currentTheme = rootElement.getAttribute("data-theme");

        // 切换主题值
        if (currentTheme === "light") {
            rootElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            toggleButton.classList.remove("icon-anse");
            toggleButton.classList.add("icon-liangsemoshi");
        } else {
            rootElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            toggleButton.classList.remove("icon-liangsemoshi");
            toggleButton.classList.add("icon-anse");
        }
    });
}
export {controlTheme};