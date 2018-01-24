;(function () {
    /**
     * @description Управляет состоянием элемента 'ProgressBlock'
     * @constructor
     * @param {Element} progressBlock
     */
    function ProgressBlockManager(progressBlock) {
        let currentValue = 0;
        let isAnimated = false;
        let isHide = false;

        const fillCircle = progressBlock.querySelector('.circle-svg__fill');

        // считает длину дуги в зависимости от радиуса окружности
        let radius = fillCircle.r.animVal.value;
        const circleLength = Math.PI * radius * 2;

        // В зависимости от длины дуги и нового значения блока
        // делает длину "штрихованой" на длину окружности для возможности с помощью смещения Dashoffset
        // как полностью заполнить круг, так и "спрятать" заполнение
        fillCircle.style.strokeDashoffset = circleLength;
        fillCircle.style.strokeDasharray = circleLength;

        // в некоторых браузерах (например safari)
        // не успевало измениться свойство strokeDashoffset до того как добавлялася анимация
        setTimeout(() => {
            fillCircle.style.transition = "stroke-dashoffset 1s linear";
        }, 0)



        /**
         * @description Меняет состояние блока 
         * @param {string} param - 'указатель на состояние которое необходимо изменить'
         * @param {string} value - 'переменная, в зависимости от которой состояние изменится'
         */
        this.setMod = function (param, value) {
            switch (param) {
                case 'animated':
                    {
                        this.setAnimation(value);
                        break;
                    }
                case 'hidden':
                    {
                        this.setHide(value);
                        break;
                    }
            }
        };

        /**
         * @description Меняет значение заполнения блока.
         * @param {number} newValue - процент заполнения блока
         */
        this.setValue = function (newValue) {
            newValue = newValue > 100 ? 100 : newValue;
            newValue = (isNaN(newValue) || newValue < 0) ? 0 : newValue;

            // В зависимости от длины дуги и нового значения блока
            // смещает "заполнение" окружности на соответствующее значение
            let arcLength = ((100 - newValue) / 100) * circleLength;

            fillCircle.style.strokeDashoffset = arcLength;

            currentValue = newValue;
        };

        /**
         * @description Меняет состояние анимации 
         * @param {string} value - 'yes - начинает анимацию, в противном случае заканчивает'
         */
        this.setAnimation = function (value) {
            if (value.toLowerCase() === 'yes') {
                isAnimated = true;
                progressBlock.style.webkitAnimationPlayState = 'running';
            } else {
                isAnimated = false;
                progressBlock.style.webkitAnimationPlayState = 'paused';
            }
        };

        /**
         * @description Меняет состояние, скрывающее блок со страницы 
         * @param {string} value - 'yes - прячет блок, в противном случае показывает'
         */
        this.setHide = function (value) {
            debugger;
            if (value.toLowerCase() === 'yes') {
                isHide = true;
                progressBlock.style.opacity = '0';
            } else {
                isHide = false;
                progressBlock.style.opacity = '1';
            }
        }

        /**
         * @return {number} - текущее значение блока
         */
        this.getCurrentValue = function () {
            return currentValue;
        }

        /**
         * @return {boolean} - анимирован ли блок
         */
        this.getIsAnimated = function () {
            return isAnimated;
        }

        /**
         * @return {boolean} - виден ли блок
         */
        this.getIsHide = function () {
            return isHide;
        }
    };

    window.ProgressBlockManager = ProgressBlockManager;
}());