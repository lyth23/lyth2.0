

// DOM Elements
const homeBtn = document.getElementById('home-btn');
const aboutBtn = document.getElementById('about-btn');
const homeView = document.getElementById('home-view');
const profileView = document.getElementById('profile-view');
const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const songsList = document.querySelector('.songs-list');
const currentSongTitle = document.getElementById('current-song-title');
const currentSongArtist = document.getElementById('current-song-artist');
const currentSongImage = document.getElementById('current-song-image');
const progressBar = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');
const volumeIcon = document.getElementById('volume-icon');
const shuffleButton = document.getElementById('shuffle-button');
const repeatButton = document.getElementById('repeat-button');

// Song data
const songs = [
    {
        title: "WILDFLOWER",
        artist: "Billie Elish",
        duration: "3:37",
        src: "https://lyth23.github.io/lythmusic/Billie%20Eilish%20-%20WILDFLOWER%20(Slowed%20+%20Reverb).mp3",
        image: "https://i.pinimg.com/originals/01/76/c7/0176c7bfdf554a5303748f145ba0e0fe.gif",
    },
    {
        title: "DtMF",
        artist: "Bad Bunny",
        duration: "3:37",
        src: "https://lyth23.github.io/lythmusic/DtMF.mp3",
        image: "https://i.pinimg.com/originals/7e/91/86/7e9186ae5123920d9f993740e9e93fb7.gif",
    },
    {
        title: "Innolvidable",
        artist: "Bad Bunny",
        duration: "3:37",
        src: "https://lyth23.github.io/lythmusic/Innolvidable.mp3",
        image: "https://i.pinimg.com/originals/c1/35/6d/c1356dbf314b3927cf2af9973c85d3ef.gif",
    },
    {
        title: "??",
        artist: "Lady Gaga",
        duration: "3:37",
        src: "https://lyth23.github.io/lythmusic/nn.mp3",
        image: "https://i.pinimg.com/originals/d0/35/99/d03599bfe4acd9159d98f708dae99afe.gif",
    },
    {
        title: "Im yours",
        artist: "Isabel Larosa",
        duration: "3:37",
        src: "https://lyth23.github.io/lythmusic/gg.mp3",
        image: "https://i.pinimg.com/736x/61/f8/86/61f886bb65d264a0f2218e8894ff00f3.jpg",
    },
    {
        title: "Spooky",
        artist: "Phonk",
        duration: "3:37",
        src: "https://lyth23.github.io/lythmusic/SPOOKY.mp3",
        image: "https://i.pinimg.com/originals/e1/eb/5f/e1eb5fbc674e213aa360897ba03d2284.gif",
      },
      {
        title: "Die With A Smile  slowed",
        artist: "Lady Gaga - Bruno Mars",
        duration: "3:37",
        src: "https://lyth23.github.io/lythmusic/Brunooo.mp3",
        image: "https://i.pinimg.com/736x/56/af/85/56af85663bef3d6acd0ab8db35c59397.jpg",
      },
      {
        title: "Residente ",
        artist: "Rene",
        duration: "3:37",
        src: "https://lyth23.github.io/lythmusic/Residente.mp3",
        image: "https://i.pinimg.com/736x/61/f8/86/61f886bb65d264a0f2218e8894ff00f3.jpg",
      },
];

let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

// Profile Interactions
document.addEventListener('DOMContentLoaded', () => {
    // Post card hover effects
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
        // Add hover animation class
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
            card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });

        // Add like functionality
        const likeButton = card.querySelector('.post-likes');
        if (likeButton) {
            likeButton.addEventListener('click', (e) => {
                e.preventDefault();
                const icon = likeButton.querySelector('i');
                icon.classList.toggle('fas');
                icon.classList.toggle('far');
                
                // Animate like button
                likeButton.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    likeButton.style.transform = 'scale(1)';
                }, 200);
            });
        }
    });

    // Lazy loading for images
    const images = document.querySelectorAll('.post-image img');
    const imageOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Navigation Functions
homeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    homeView.classList.remove('hidden');
    profileView.classList.add('hidden');
    homeBtn.classList.add('active');
    aboutBtn.classList.remove('active');
});

aboutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    homeView.classList.add('hidden');
    profileView.classList.remove('hidden');
    aboutBtn.classList.add('active');
    homeBtn.classList.remove('active');
});

// Music Player Functions
function loadAndPlaySong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    currentSongTitle.textContent = song.title;
    currentSongArtist.textContent = song.artist;
    currentSongImage.src = song.image;
    playSong();
}

function playSong() {
    audioPlayer.play();
    isPlaying = true;
    updatePlayPauseButtons();
}

function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
    updatePlayPauseButtons();
}

function updatePlayPauseButtons() {
    playPauseButton.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
}

function playNextSong() {
    if (isShuffle) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * songs.length);
        } while (newIndex === currentSongIndex);
        currentSongIndex = newIndex;
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    }
    loadAndPlaySong(currentSongIndex);
}

function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadAndPlaySong(currentSongIndex);
}

// Event Listeners
playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevButton.addEventListener('click', playPrevSong);
nextButton.addEventListener('click', playNextSong);

// Progress Bar Update
audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    const progressPercent = (currentTime / duration) * 100;

    progressBar.style.width = `${progressPercent}%`;
    currentTimeElement.textContent = formatTime(currentTime);
    durationElement.textContent = formatTime(duration);
});

function formatTime(time) {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Volume Control
volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value;
    audioPlayer.volume = volume;
    updateVolumeIcon(volume);
});

function updateVolumeIcon(volume) {
    volumeIcon.className = 'fas';
    if (volume > 0.5) {
        volumeIcon.classList.add('fa-volume-up');
    } else if (volume > 0) {
        volumeIcon.classList.add('fa-volume-down');
    } else {
        volumeIcon.classList.add('fa-volume-mute');
    }
}

// Shuffle and Repeat
shuffleButton.addEventListener('click', () => {
    isShuffle = !isShuffle;
    shuffleButton.classList.toggle('active');
});

repeatButton.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatButton.classList.toggle('active');
});

// When song ends
audioPlayer.addEventListener('ended', () => {
    if (isRepeat) {
        audioPlayer.currentTime = 0;
        playSong();
    } else {
        playNextSong();
    }
});

// Generate song list
songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.className = 'song-item';
    li.innerHTML = `
        <img src="${song.image}" alt="${song.title}" class="song-image">
        <div class="song-info">
            <div class="song-title">${song.title}</div>
            <div class="song-artist">${song.artist}</div>
        </div>
        <div class="song-meta">
            <span class="song-duration">${song.duration}</span>
        </div>
    `;

    li.addEventListener('click', () => {
        currentSongIndex = index;
        loadAndPlaySong(currentSongIndex);
    });

    songsList.appendChild(li);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add iOS-specific touch handling
    document.addEventListener('touchstart', () => {}, {passive: true});
    
    // Prevent elastic scrolling on iOS
    document.body.addEventListener('touchmove', (e) => {
        if (e.target.closest('.main-content')) return;
        e.preventDefault();
    }, { passive: false });
    
    // Initialize the player
    loadAndPlaySong(currentSongIndex);
    
    // Add active state to buttons on touch
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', () => {
            button.style.opacity = '0.7';
        });
        button.addEventListener('touchend', () => {
            button.style.opacity = '1';
        });
    });
});

// Add smooth scrolling for iOS
const mainContent = document.querySelector('.main-content');
mainContent.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        document.documentElement.style.setProperty(
            '--scroll-top',
            `${mainContent.scrollTop}px`
        );
    });
});
// Actualizar el manejo de la navegación
document.addEventListener('DOMContentLoaded', () => {
    const homeBtn = document.getElementById('home-btn');
    const aboutBtn = document.getElementById('about-btn');
    const moreBtn = document.getElementById('opera-button');
    const socialBtn = document.querySelector('.nav-item[href="https://instagram.com"]');
    
    const homeView = document.getElementById('home-view');
    const profileView = document.getElementById('profile-view');
    const contactView = document.getElementById('contact-view');

    // Función para manejar la navegación
    function handleNavigation(activeBtn, activeView) {
        // Ocultar todas las vistas
        [homeView, profileView, contactView].forEach(view => {
            if (view) view.classList.add('hidden');
        });

        // Remover clase active de todos los botones
        [homeBtn, aboutBtn, moreBtn, socialBtn].forEach(btn => {
            if (btn) btn.classList.remove('active');
        });

        // Mostrar vista activa y activar botón correspondiente
        if (activeView) activeView.classList.remove('hidden');
        if (activeBtn) activeBtn.classList.add('active');
    }

    // Event listeners para la navegación
    homeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleNavigation(homeBtn, homeView);
    });

    aboutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleNavigation(aboutBtn, profileView);
    });

    moreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleNavigation(moreBtn, contactView);
    });

    socialBtn.addEventListener('click', (e) => {
        // Remover active de todos los botones cuando se va a un enlace externo
        [homeBtn, aboutBtn, moreBtn, socialBtn].forEach(btn => {
            if (btn) btn.classList.remove('active');
        });
    });

    // Inicializar con la vista home activa
    handleNavigation(homeBtn, homeView);
});

document.getElementById("suggestionForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío normal del formulario

    emailjs.init("VOAWwlGX2PBWEIVHP");  

emailjs.send("service_0wgijdf", "template_1mcidxp", {  
    to_email: "agtetik@gmail.com",  
    from_name: document.getElementById("name").value,  
    from_email: document.getElementById("email").value,  
    message: document.getElementById("message").value,  
    category: document.getElementById("category").value  
})
.then(() => {
    document.getElementById("successMessage").classList.remove("hidden");  
    document.getElementById("suggestionForm").reset();  
})
.catch(error => alert("Error al enviar: " + error));

});
