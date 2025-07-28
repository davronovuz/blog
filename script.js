// Global variables
let currentSlide = 0;
const totalSlides = 16;
let isAnimating = false;

// DOM elements
const slidesContainer = document.getElementById('slidesContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');

// Initialize presentation
document.addEventListener('DOMContentLoaded', function() {
    initializePresentation();
    initializeInteractiveElements();
    setupEventListeners();
    startAnimations();
});

// Initialize presentation
function initializePresentation() {
    // Set initial slide
    showSlide(0);
    
    // Initialize power bars for Intel comparison
    setTimeout(() => {
        initializePowerBars();
    }, 1000);
    
    // Initialize frequency slider
    initializeFrequencySlider();
    
    // Initialize RAM slider
    initializeRAMSlider();
    
    // Initialize loading demo
    initializeLoadingDemo();
}

// Setup event listeners
function setupEventListeners() {
    // Navigation buttons
    prevBtn.addEventListener('click', () => previousSlide());
    nextBtn.addEventListener('click', () => nextSlide());
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyNavigation);
    
    // Touch/swipe navigation
    setupTouchNavigation();
    
    // Choice cards interaction (Slide 1)
    setupChoiceCards();
    
    // Intel tier interaction (Slide 7)
    setupIntelTiers();
    
    // Screen size interaction (Slide 13)
    setupScreenSizes();
    
    // Brand cards interaction (Slide 15)
    setupBrandCards();
}

// Navigation functions
function nextSlide() {
    if (isAnimating) return;
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    }
}

function previousSlide() {
    if (isAnimating) return;
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
}

function goToSlide(slideIndex) {
    if (isAnimating || slideIndex === currentSlide) return;
    
    isAnimating = true;
    
    // Hide current slide
    const currentSlideElement = document.getElementById(`slide-${currentSlide}`);
    if (currentSlideElement) {
        currentSlideElement.classList.remove('active');
    }
    
    // Update current slide index
    currentSlide = slideIndex;
    
    // Show new slide
    const newSlideElement = document.getElementById(`slide-${currentSlide}`);
    if (newSlideElement) {
        setTimeout(() => {
            newSlideElement.classList.add('active');
            updateNavigation();
            triggerSlideAnimations(currentSlide);
            
            setTimeout(() => {
                isAnimating = false;
            }, 600);
        }, 100);
    }
}

function showSlide(slideIndex) {
    const slideElement = document.getElementById(`slide-${slideIndex}`);
    if (slideElement) {
        slideElement.classList.add('active');
        updateNavigation();
        triggerSlideAnimations(slideIndex);
    }
}

function updateNavigation() {
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Update navigation buttons
    prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
    nextBtn.style.opacity = currentSlide === totalSlides - 1 ? '0.5' : '1';
}

// Keyboard navigation
function handleKeyNavigation(event) {
    switch(event.key) {
        case 'ArrowRight':
        case ' ':
            event.preventDefault();
            nextSlide();
            break;
        case 'ArrowLeft':
            event.preventDefault();
            previousSlide();
            break;
        case 'Home':
            event.preventDefault();
            goToSlide(0);
            break;
        case 'End':
            event.preventDefault();
            goToSlide(totalSlides - 1);
            break;
    }
}

// Touch navigation
function setupTouchNavigation() {
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', (e) => {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide();
            } else {
                previousSlide();
            }
        }
        
        startX = 0;
        startY = 0;
    });
}

// Interactive elements initialization
function initializeInteractiveElements() {
    // Add staggered animations to list items
    addStaggeredAnimations();
    
    // Initialize hover effects
    initializeHoverEffects();
    
    // Initialize scroll animations
    initializeScrollAnimations();
}

// Add staggered animations to list items
function addStaggeredAnimations() {
    const proItems = document.querySelectorAll('.pro-item');
    const conItems = document.querySelectorAll('.con-item');
    
    proItems.forEach((item, index) => {
        item.style.setProperty('--i', index + 1);
        item.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
    
    conItems.forEach((item, index) => {
        item.style.setProperty('--i', index + 1);
        item.style.animationDelay = `${(index + 1) * 0.1}s`;
    });
}

// Initialize hover effects
function initializeHoverEffects() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.choice-card, .manufacturer-card, .brand-card, .gpu-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.info-card, .timeline-item, .advantage-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Slide-specific animations
function triggerSlideAnimations(slideIndex) {
    switch(slideIndex) {
        case 0:
            triggerTitleAnimations();
            break;
        case 1:
            triggerChoiceAnimations();
            break;
        case 5:
            triggerProcessorAnimations();
            break;
        case 7:
            triggerIntelAnimations();
            break;
        case 8:
            triggerTimelineAnimations();
            break;
        case 9:
            triggerFrequencyAnimations();
            break;
        case 10:
            triggerRAMAnimations();
            break;
        case 11:
            triggerStorageAnimations();
            break;
        case 12:
            resetLoadingDemo();
            break;
        case 13:
            triggerScreenAnimations();
            break;
        case 14:
            triggerGPUAnimations();
            break;
        case 15:
            triggerBrandAnimations();
            break;
    }
}

// Title slide animations
function triggerTitleAnimations() {
    const titleWords = document.querySelectorAll('.title-word');
    const subtitle = document.querySelector('.title-subtitle');
    const computerIcons = document.querySelectorAll('.laptop-icon, .desktop-icon');
    
    titleWords.forEach((word, index) => {
        setTimeout(() => {
            word.style.opacity = '1';
            word.style.transform = 'translateY(0)';
        }, (index + 1) * 200);
    });
    
    setTimeout(() => {
        if (subtitle) {
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }
    }, 800);
    
    setTimeout(() => {
        computerIcons.forEach(icon => {
            icon.style.opacity = '1';
            icon.style.animation = 'float 3s ease-in-out infinite';
        });
    }, 1200);
}

// Choice animations
function triggerChoiceAnimations() {
    const choiceCards = document.querySelectorAll('.choice-card');
    const vsDiv = document.querySelector('.vs-divider');
    
    choiceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 300);
    });
    
    setTimeout(() => {
        if (vsDiv) {
            vsDiv.style.opacity = '1';
            vsDiv.style.animation = 'pulse 2s ease-in-out infinite';
        }
    }, 600);
}

// Processor animations
function triggerProcessorAnimations() {
    const cpuCores = document.querySelectorAll('.cpu-core');
    const processingBar = document.querySelector('.processing-bar');
    
    cpuCores.forEach((core, index) => {
        setTimeout(() => {
            core.style.animation = 'coreActivity 2s ease-in-out infinite';
            core.style.animationDelay = `${index * 0.5}s`;
        }, 500);
    });
    
    if (processingBar) {
        setTimeout(() => {
            processingBar.style.opacity = '1';
        }, 800);
    }
}

// Intel tier animations
function triggerIntelAnimations() {
    initializePowerBars();
}

// Initialize power bars
function initializePowerBars() {
    const powerBars = document.querySelectorAll('.power-fill');
    
    powerBars.forEach((bar, index) => {
        setTimeout(() => {
            const tier = bar.closest('.intel-tier').dataset.tier;
            let width = '30%';
            
            switch(tier) {
                case 'i3': width = '30%'; break;
                case 'i5': width = '60%'; break;
                case 'i7': width = '85%'; break;
                case 'i9': width = '100%'; break;
            }
            
            bar.style.width = width;
        }, index * 200);
    });
}

// Timeline animations
function triggerTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Frequency animations
function triggerFrequencyAnimations() {
    const frequencySlider = document.getElementById('frequencySlider');
    if (frequencySlider) {
        updateFrequencyDisplay(frequencySlider.value);
    }
}

// Initialize frequency slider
function initializeFrequencySlider() {
    const frequencySlider = document.getElementById('frequencySlider');
    const frequencyValue = document.getElementById('frequencyValue');
    const performanceFill = document.getElementById('performanceFill');
    
    if (frequencySlider) {
        frequencySlider.addEventListener('input', (e) => {
            updateFrequencyDisplay(e.target.value);
        });
        
        // Initial update
        updateFrequencyDisplay(frequencySlider.value);
    }
}

function updateFrequencyDisplay(value) {
    const frequencyValue = document.getElementById('frequencyValue');
    const performanceFill = document.getElementById('performanceFill');
    
    if (frequencyValue) {
        frequencyValue.textContent = value;
    }
    
    if (performanceFill) {
        const percentage = ((value - 1.0) / (5.0 - 1.0)) * 100;
        performanceFill.style.width = `${percentage}%`;
    }
}

// RAM animations
function triggerRAMAnimations() {
    const deskItems = document.querySelectorAll('.desk-item');
    
    deskItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'deskItemFloat 2s ease-in-out infinite';
            item.style.animationDelay = `${index * 0.5}s`;
        }, 300);
    });
}

// Initialize RAM slider
function initializeRAMSlider() {
    const ramSlider = document.getElementById('ramSlider');
    
    if (ramSlider) {
        ramSlider.addEventListener('input', (e) => {
            updateRAMDisplay(e.target.value);
        });
        
        // Initial update
        updateRAMDisplay(ramSlider.value);
    }
}

function updateRAMDisplay(value) {
    const ramValue = document.getElementById('ramValue');
    const performanceTitle = document.getElementById('performanceTitle');
    const usageExamples = document.getElementById('usageExamples');
    const performanceRating = document.getElementById('performanceRating');
    
    if (ramValue) {
        ramValue.textContent = value;
    }
    
    // Update performance info based on RAM value
    const ramConfigs = {
        4: {
            title: 'Oddiy foydalanuvchi',
            examples: ['Internet ko\'rish', 'Oddiy ofis dasturlari', 'Elektron pochta'],
            stars: 2
        },
        8: {
            title: 'O\'rtacha foydalanuvchi',
            examples: ['Internet ko\'rish', 'Ofis dasturlari', 'Video tomosha qilish'],
            stars: 3
        },
        12: {
            title: 'Faol foydalanuvchi',
            examples: ['Ko\'p dasturlar', 'Yengil o\'yinlar', 'Rasm tahrirlash'],
            stars: 4
        },
        16: {
            title: 'Professional foydalanuvchi',
            examples: ['Video montaj', 'O\'yinlar', 'Dasturlash'],
            stars: 4
        },
        20: {
            title: 'Yuqori darajali foydalanuvchi',
            examples: ['4K video montaj', 'Og\'ir o\'yinlar', '3D modellashtirish'],
            stars: 5
        },
        24: {
            title: 'Professional ish stantsiyasi',
            examples: ['Server vazifalar', 'Sun\'iy intellekt', 'Katta ma\'lumotlar'],
            stars: 5
        },
        28: {
            title: 'Yuqori unumdorlik',
            examples: ['Virtualizatsiya', 'Professional render', 'Server'],
            stars: 5
        },
        32: {
            title: 'Maksimal unumdorlik',
            examples: ['Korxona serveri', 'Professional render', 'AI o\'qitish'],
            stars: 5
        }
    };
    
    const config = ramConfigs[value] || ramConfigs[8];
    
    if (performanceTitle) {
        performanceTitle.textContent = config.title;
    }
    
    if (usageExamples) {
        usageExamples.innerHTML = config.examples.map(example => 
            `<span>${example}</span>`
        ).join('');
    }
    
    if (performanceRating) {
        const stars = performanceRating.querySelector('.rating-stars');
        if (stars) {
            stars.innerHTML = '';
            for (let i = 1; i <= 5; i++) {
                const star = document.createElement('i');
                star.className = i <= config.stars ? 'fas fa-star' : 'far fa-star';
                stars.appendChild(star);
            }
        }
    }
}

// Storage animations
function triggerStorageAnimations() {
    const hddDisk = document.querySelector('.hdd-disk');
    const hddArm = document.querySelector('.hdd-arm');
    const dataFlow = document.querySelector('.data-flow');
    
    if (hddDisk) {
        hddDisk.style.animation = 'hddSpin 2s linear infinite';
    }
    
    if (hddArm) {
        hddArm.style.animation = 'hddArmMove 1s ease-in-out infinite alternate';
    }
    
    if (dataFlow) {
        dataFlow.style.animation = 'dataFlow 1.5s ease-in-out infinite';
    }
}

// Initialize loading demo
function initializeLoadingDemo() {
    const demoButton = document.getElementById('startDemo');
    
    if (demoButton) {
        demoButton.addEventListener('click', startLoadingDemo);
    }
}

function startLoadingDemo() {
    const hddProgress = document.getElementById('hddProgress');
    const ssdProgress = document.getElementById('ssdProgress');
    const hddTime = document.getElementById('hddTime');
    const ssdTime = document.getElementById('ssdTime');
    const hddItems = document.querySelectorAll('.hdd-test .loading-item');
    const ssdItems = document.querySelectorAll('.ssd-test .loading-item');
    
    // Reset everything
    resetLoadingDemo();
    
    // HDD simulation (slower)
    let hddTimeValue = 0;
    let ssdTimeValue = 0;
    
    const hddInterval = setInterval(() => {
        hddTimeValue += 0.1;
        const progress = Math.min((hddTimeValue / 8) * 100, 100);
        
        if (hddProgress) hddProgress.style.width = `${progress}%`;
        if (hddTime) hddTime.textContent = hddTimeValue.toFixed(1);
        
        // Complete items based on time
        hddItems.forEach((item, index) => {
            const delay = parseFloat(item.dataset.delay) / 1000;
            if (hddTimeValue >= delay) {
                item.classList.add('completed');
            }
        });
        
        if (hddTimeValue >= 8) {
            clearInterval(hddInterval);
        }
    }, 100);
    
    // SSD simulation (faster)
    const ssdInterval = setInterval(() => {
        ssdTimeValue += 0.1;
        const progress = Math.min((ssdTimeValue / 2) * 100, 100);
        
        if (ssdProgress) ssdProgress.style.width = `${progress}%`;
        if (ssdTime) ssdTime.textContent = ssdTimeValue.toFixed(1);
        
        // Complete items based on time
        ssdItems.forEach((item, index) => {
            const delay = parseFloat(item.dataset.delay) / 1000;
            if (ssdTimeValue >= delay) {
                item.classList.add('completed');
            }
        });
        
        if (ssdTimeValue >= 2) {
            clearInterval(ssdInterval);
        }
    }, 100);
}

function resetLoadingDemo() {
    const hddProgress = document.getElementById('hddProgress');
    const ssdProgress = document.getElementById('ssdProgress');
    const hddTime = document.getElementById('hddTime');
    const ssdTime = document.getElementById('ssdTime');
    const allItems = document.querySelectorAll('.loading-item');
    
    if (hddProgress) hddProgress.style.width = '0%';
    if (ssdProgress) ssdProgress.style.width = '0%';
    if (hddTime) hddTime.textContent = '0';
    if (ssdTime) ssdTime.textContent = '0';
    
    allItems.forEach(item => {
        item.classList.remove('completed');
    });
}

// Screen animations
function triggerScreenAnimations() {
    const screenSizes = document.querySelectorAll('.screen-size');
    
    screenSizes.forEach((size, index) => {
        setTimeout(() => {
            size.style.opacity = '1';
            size.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// GPU animations
function triggerGPUAnimations() {
    const gpuVisuals = document.querySelectorAll('.integrated-gpu, .dedicated-gpu');
    
    gpuVisuals.forEach((visual, index) => {
        setTimeout(() => {
            visual.style.opacity = '1';
            visual.style.transform = 'scale(1)';
        }, index * 300);
    });
}

// Brand animations
function triggerBrandAnimations() {
    const brandCards = document.querySelectorAll('.brand-card');
    
    brandCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Interactive card setups
function setupChoiceCards() {
    const choiceCards = document.querySelectorAll('.choice-card');
    
    choiceCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            choiceCards.forEach(c => c.classList.remove('selected'));
            // Add active class to clicked card
            card.classList.add('selected');
            
            // Add some visual feedback
            card.style.transform = 'translateY(-15px) scale(1.05)';
            setTimeout(() => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            }, 200);
        });
    });
}

function setupIntelTiers() {
    const intelTiers = document.querySelectorAll('.intel-tier');
    
    intelTiers.forEach(tier => {
        tier.addEventListener('click', () => {
            // Remove active class from all tiers
            intelTiers.forEach(t => t.classList.remove('selected'));
            // Add active class to clicked tier
            tier.classList.add('selected');
            
            // Animate power bar
            const powerFill = tier.querySelector('.power-fill');
            if (powerFill) {
                powerFill.style.transform = 'scaleY(1.2)';
                setTimeout(() => {
                    powerFill.style.transform = 'scaleY(1)';
                }, 300);
            }
        });
    });
}

function setupScreenSizes() {
    const screenSizes = document.querySelectorAll('.screen-size');
    
    screenSizes.forEach(size => {
        size.addEventListener('click', () => {
            // Remove active class from all sizes
            screenSizes.forEach(s => s.classList.remove('selected'));
            // Add active class to clicked size
            size.classList.add('selected');
            
            // Animate screen
            const screenFrame = size.querySelector('.screen-frame');
            if (screenFrame) {
                screenFrame.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    screenFrame.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
}

function setupBrandCards() {
    const brandCards = document.querySelectorAll('.brand-card');
    
    brandCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            brandCards.forEach(c => c.classList.remove('selected'));
            // Add active class to clicked card
            card.classList.add('selected');
            
            // Animate rating stars
            const stars = card.querySelectorAll('.stars i');
            stars.forEach((star, index) => {
                setTimeout(() => {
                    star.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        star.style.transform = 'scale(1)';
                    }, 100);
                }, index * 50);
            });
        });
    });
}

// Start initial animations
function startAnimations() {
    // Animate navigation dots
    setTimeout(() => {
        dots.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.transform = 'scale(1)';
                dot.style.opacity = '1';
            }, index * 50);
        });
    }, 500);
    
    // Animate navigation buttons
    setTimeout(() => {
        prevBtn.style.opacity = '0.5';
        nextBtn.style.opacity = '1';
    }, 800);
}

// Utility functions
function addGlowEffect(element, color = '#3498db') {
    element.style.boxShadow = `0 0 20px ${color}`;
    setTimeout(() => {
        element.style.boxShadow = '';
    }, 1000);
}

function addPulseEffect(element) {
    element.style.animation = 'pulse 0.5s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

// Auto-advance functionality (optional)
let autoAdvanceTimer = null;

function startAutoAdvance(interval = 10000) {
    stopAutoAdvance();
    autoAdvanceTimer = setInterval(() => {
        if (currentSlide < totalSlides - 1) {
            nextSlide();
        } else {
            goToSlide(0); // Loop back to start
        }
    }, interval);
}

function stopAutoAdvance() {
    if (autoAdvanceTimer) {
        clearInterval(autoAdvanceTimer);
        autoAdvanceTimer = null;
    }
}

// Pause auto-advance on user interaction
document.addEventListener('click', stopAutoAdvance);
document.addEventListener('keydown', stopAutoAdvance);
document.addEventListener('touchstart', stopAutoAdvance);

// Fullscreen functionality
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

// Add fullscreen toggle on F11 or double-click
document.addEventListener('keydown', (e) => {
    if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
    }
});

document.addEventListener('dblclick', (e) => {
    if (e.target.closest('.slide-content')) {
        toggleFullscreen();
    }
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize resize events
window.addEventListener('resize', debounce(() => {
    // Recalculate any size-dependent elements
    updateLayout();
}, 250));

function updateLayout() {
    // Update any layout-dependent calculations
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        // Trigger reflow if needed
        slide.offsetHeight;
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Presentation error:', e.error);
    // Optionally show user-friendly error message
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    stopAutoAdvance();
});

// Export functions for external use
window.PresentationAPI = {
    nextSlide,
    previousSlide,
    goToSlide,
    startAutoAdvance,
    stopAutoAdvance,
    toggleFullscreen,
    getCurrentSlide: () => currentSlide,
    getTotalSlides: () => totalSlides
};