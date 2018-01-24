;(function () {
    /**
     * @description Управляет состоянием элемента 'ProgressBlock'
     * @constructor
     * @param {Element} progressBlock
     */
    function ProgressBlockManager(progressBlock) {
        this.progressBlock = progressBlock;
        this.currentValue = 0;
        this.isAnimated = false;
        this.isHide = false;

        this.fillCircle = progressBlock.querySelector('.circle-svg__fill');

        // считает длину дуги в зависимости от радиуса окружности
        let radius = this.fillCircle.r.animVal.value;
        this.circleLength = Math.PI * radius * 2;

        // В зависимости от длины дуги и нового значения блока
        // делает длину "штрихованой" на длину окружности для возможности с помощью смещения Dashoffset
        // как полностью заполнить круг, так и "спрятать" заполнение
        // и добавляет анимацию
        this.fillCircle.style.strokeDasharray = this.circleLength;
        this.fillCircle.style.strokeDashoffset = this.circleLength;
        this.fillCircle.style.transition = "stroke-dashoffset 1s linear";


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
            let arcLength = ((100 - newValue) / 100) * this.circleLength;

            this.fillCircle.style.strokeDashoffset = arcLength;
        };

        /**
         * @description Меняет состояние анимации 
         * @param {string} value - 'yes - начинает анимацию, в противном случае заканчивает'
         */
        this.setAnimation = function (value) {
            if (value.toLowerCase() === 'yes') {
                this.isAnimated = true;
                this.progressBlock.style.webkitAnimationPlayState = 'running';
            } else {
                this.isAnimated = false;
                this.progressBlock.style.webkitAnimationPlayState = 'paused';
            }
        };

        /**
         * @description Меняет состояние, скрывающее блок со страницы 
         * @param {string} value - 'yes - прячет блок, в противном случае показывает'
         */
        this.setHide = function (value) {
            if (value.toLowerCase() === 'yes') {
                this.isHide = true;
                this.progressBlock.style.opacity = '0';
            } else {
                this.isHide = false;
                this.progressBlock.style.opacity = '1';
            }
        }
    };

    window.ProgressBlockManager = ProgressBlockManager;
}());