// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const cd = $('.cd');
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')


const app = {

    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    // (1/2) Uncomment the line below to use localStorage
    // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    songs: [
        {
            name: "Đừng Làm trái tim anh đau",
            singer: "Sơn Tùng MTP",
            path: "./assets/audio/y2mate.com - Đừng Làm Trái Tim Anh Đau.mp3",
            image: "./assets/img/DunglamTraiTimAnhDau.jpg"
        },
        {
            name: "Nàng Thơ",
            singer: "Hoàng Dũng",
            path: "./assets/audio/y2mate.com - Nàng Thơ.mp3",
            image:
                "./assets/img/NangTho.jpg"
        },
        {
            name: "Muộn rồi mà sao còn",
            singer: "Sơn Tùng MTP",
            path:
                "./assets/audio/y2mate.com - SƠN TÙNG MTP  MUỘN RỒI MÀ SAO CÒN  LYRICS VIDEO.mp3",
            image: "./assets/img/MuonRoiMaSaoCon.jpg"
        },
        {
            name: "Đừng Làm trái tim anh đau",
            singer: "Sơn Tùng MTP",
            path: "./assets/audio/y2mate.com - Đừng Làm Trái Tim Anh Đau.mp3",
            image: "./assets/img/DunglamTraiTimAnhDau.jpg"
        },
        {
            name: "Nàng Thơ",
            singer: "Hoàng Dũng",
            path: "./assets/audio/y2mate.com - Nàng Thơ.mp3",
            image:
                "./assets/img/NangTho.jpg"
        },
        {
            name: "Muộn rồi mà sao còn",
            singer: "Sơn Tùng MTP",
            path:
                "./assets/audio/y2mate.com - SƠN TÙNG MTP  MUỘN RỒI MÀ SAO CÒN  LYRICS VIDEO.mp3",
            image: "./assets/img/MuonRoiMaSaoCon.jpg"
        }
        , {
            name: "Đừng Làm trái tim anh đau",
            singer: "Sơn Tùng MTP",
            path: "./assets/audio/y2mate.com - Đừng Làm Trái Tim Anh Đau.mp3",
            image: "./assets/img/DunglamTraiTimAnhDau.jpg"
        },
        {
            name: "Nàng Thơ",
            singer: "Hoàng Dũng",
            path: "./assets/audio/y2mate.com - Nàng Thơ.mp3",
            image:
                "./assets/img/NangTho.jpg"
        },
        {
            name: "Muộn rồi mà sao còn",
            singer: "Sơn Tùng MTP",
            path:
                "./assets/audio/y2mate.com - SƠN TÙNG MTP  MUỘN RỒI MÀ SAO CÒN  LYRICS VIDEO.mp3",
            image: "./assets/img/MuonRoiMaSaoCon.jpg"
        }



    ],
    setConfig: function(key,value) {
        this.config[key] = value
        localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function () {
        
        const htmls = this.songs.map((song, index) => {
            return `<div class="song ${index === this.currentIndex ? 'active' : ''}" data-index= "${index}">
                        <div class="thumb"
                            style="background-image: url('${song.image}')">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>`
        })
        playlist.innerHTML = htmls.join('');

    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvents: function () {
        
        const _this = this
        const cdWidth = cd.offsetWidth;

        // Xử lí CD quay / dừng

        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })

        cdThumbAnimate.pause();

        // Xử lí phóng to / thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop;

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth
        }

        // Xử lí khi click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }

        }

        // Xử lí khi click play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }

        // Xử lí khi click pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        // Khi tiến độ thay đổi

        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                $('.progress').value = progressPercent;
            }
        }

        // Xử lí khi tua song
        progress.onchange = function (e) {
            const seekTime = audio.duration * (e.target.value / 100);
            audio.currentTime = seekTime;
        }

        // Khi next song
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong();
            }
            audio.play();

            const listSong = $$('.song')
            listSong.forEach(song=> {
                $('.song.active').classList.remove('active')
                listSong[_this.currentIndex].classList.add('active')
            })
            _this.scrollToActiveSong();

        }


        // Khi prev song
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong();
            }
            audio.play();

            const listSong = $$('.song')
            listSong.forEach(song=> {
                $('.song.active').classList.remove('active')
                listSong[_this.currentIndex].classList.add('active')
            })
            _this.scrollToActiveSong();

        }

        // Xử lí bật/ tắt random song
        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom',_this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom);
        }

        // Xử lí lặp lai song
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat',_this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        // Xử lí net Song  khi audio ended
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click()
            }
        }
        // Lắng nghe hành vi click vào playlist
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)');

            if(songNode || e.target.closest('.option')){
                if(songNode){
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong()
                    audio.play();
                    _this.render()
                }
            }
        }




    },
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
    },
    loadConfig: function ()  {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
        

    },
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
        
    },
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex)

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior:'smooth',
                block: 'center'
            })
        }, 300);
    },
    start: function () {
        // Gán cấu hình từ config vào ứng dụng
        this.loadConfig();
        // Định nghĩa các thuộc tính của Object
        this.defineProperties();

        // Lắng nghe / xử lý các sự kiện (DOM events)
        this.handleEvents();

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        // Render playlist
        this.render();


        // Hiển thị trạng thái ban đầu của button repeat and random
        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);

    }
}

app.start();
