// 1. Firebase Kütüphanelerini İçe Aktar
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';



// 3. Firebase'i Başlat
// Paste your URL and ANON KEY here
const supabaseUrl = 'https://sshcukoficvqleukxdis.supabase.co';
const supabaseKey = 'sb_publishable__2wMkK-PhXYHQrbIcR-Qmw_cT4dhkcn';
const supabase = createClient(supabaseUrl, supabaseKey);

window.supabase = supabase;


const GenreTranslations = {
    "Rock": { tr: "Rock", en: "Rock" },
    "Pop": { tr: "Pop", en: "Pop" },
    "Hip Hop": { tr: "Hip Hop", en: "Hip Hop" },
    "Hip-Hop": { tr: "Hip Hop", en: "Hip Hop" },
    "Rap": { tr: "Rap", en: "Rap" },
    "R&B": { tr: "R&B", en: "R&B" },
    "Rnb": { tr: "R&B", en: "R&B" },
    "Electronic": { tr: "Elektronik", en: "Electronic" },
    "Electronica": { tr: "Elektronik", en: "Electronic" },
    "Dance": { tr: "Dans", en: "Dance" },
    "Jazz": { tr: "Caz", en: "Jazz" },
    "Blues": { tr: "Blues", en: "Blues" },
    "Classical": { tr: "Klasik", en: "Classical" },
    "Folk": { tr: "Folk", en: "Folk" },
    "Country": { tr: "Country", en: "Country" },
    "Alternative": { tr: "Alternatif", en: "Alternative" },
    "Alternative Rock": { tr: "Alternatif Rock", en: "Alternative Rock" },
    "Indie": { tr: "Indie", en: "Indie" },
    "Indie Rock": { tr: "Indie Rock", en: "Indie Rock" },
    "Indie Pop": { tr: "Indie Pop", en: "Indie Pop" },
    "Metal": { tr: "Metal", en: "Metal" },
    "Heavy Metal": { tr: "Heavy Metal", en: "Heavy Metal" },
    "Punk": { tr: "Punk", en: "Punk" },
    "Reggae": { tr: "Reggae", en: "Reggae" },
    "Soul": { tr: "Soul", en: "Soul" },
    "Funk": { tr: "Funk", en: "Funk" },
    "Disco": { tr: "Disko", en: "Disco" },
    "Techno": { tr: "Tekno", en: "Techno" },
    "House": { tr: "House", en: "House" },
    "Trance": { tr: "Trance", en: "Trance" },
    "Dubstep": { tr: "Dubstep", en: "Dubstep" },
    "Ambient": { tr: "Ambient", en: "Ambient" },
    "Latin": { tr: "Latin", en: "Latin" },
    "World": { tr: "Dünya Müziği", en: "World" },
    "Acoustic": { tr: "Akustik", en: "Acoustic" },
    "Soundtrack": { tr: "Film Müziği", en: "Soundtrack" },
    "Vocal": { tr: "Vokal", en: "Vocal" },
    "Turkish Pop": { tr: "Türkçe Pop", en: "Turkish Pop" },
    "Turkish Rock": { tr: "Türkçe Rock", en: "Turkish Rock" },
    "Turkish Rap": { tr: "Türkçe Rap", en: "Turkish Rap" },
    "Anatolian Rock": { tr: "Anadolu Rock", en: "Anatolian Rock" },
    "Arabesque": { tr: "Arabesk", en: "Arabesque" }
};

const Translations = {
    en: {
        app_title: "RateAgainst",
        nav_library: "Library",
        nav_search: "Search",
        nav_stats: "Stats",
        menu_settings: "Menu & Settings",
        language_label: "Dil / Language",
        theme_label: "Tema / Theme",
        nav_data: "Data",
        export_json: "Export JSON",
        import_json: "Import JSON",
        export_4_5_star: "Favorite (4-5 Star) Tracks",
        artists: "Artists",
        search_artist: "Search artist...",
        all_artists: "All Artists",
        all_genres: "All Genres",
        all_years: "All Years",
        all_labels: "All Labels",
        no_albums: "Library is Empty",
        no_albums_desc: "Search for albums you listen to, rate them, and build your archive.",
        add_first_album: "Add Album",
        what_listening: "What are you listening to?",
        artist_disco: "Artist",
        by_album: "Album",
        search_btn: "Search",
        search_db: "Searching database...",
        music_taste: "Your Music Taste",
        unique_artists: "Artists",
        total_albums: "Albums",
        overall_avg: "Average",
        favorite_albums: "Favorite Albums",
        rated_artists: "Artists",
        music_genres: "Genres",
        image_link: "Image URL",
        apply_url: "Apply",
        search_itunes: "Search iTunes",
        album_avg: "Album Average",
        tracklist: "Tracklist",
        default_sort: "Default",
        sort_by_rating: "By Rating",
        favorite_tracks: "Favorites",
        copy_list: "Copy List",
        add_genre: "Add Genre",
        type_genres_comma: "You can add genres by <span class=\"font-bold text-gray-800 dark:text-gray-200\">separating them with commas</span> (Max 3).",
        auto_find: "Auto Find",
        add: "Add",
        update: "Update",
        remove: "Remove",
        add_new_track: "Add Track",
        unknown: "Unknown",
        independent: "Independent",
        no_cover: "No Cover",
        studio_album: "Album",
        ep: "EP",
        added_to_lib: "Added",
        added: "Updated",
        searching_artist: "Searching artist...",
        searching_albums: "Searching albums...",
        fetching_albums: "Fetching albums for",
        no_studio_albums: "No data.",
        no_results: "Not found.",
        try_full_names: "Try full names.",
        no_saved_artists: "Empty.",
        error_loading: "Error loading data.",
        no_tracks: "No tracks.",
        no_data: "No data.",
        no_rated_albums: "None.",
        no_genre_data: "No genres.",
        no_rating: "Unrated",
        albums: "albums",
        placeholder_artist: "Artist/Band name...",
        placeholder_album: "Album name...",
        toast_no_export: "Empty.",
        toast_export_success: "Downloaded.",
        toast_import_success: "added.",
        toast_import_error: "Error.",
        toast_no_5star: "None.",
        toast_copied: "Copied!",
        toast_copy_fail: "Failed.",
        toast_conn_error: "Network error.",
        toast_auto_genre_success: "genres added.",
        toast_auto_genre_info: "No new genres.",
        toast_auto_genre_fail: "Not found.",
        toast_cover_applied: "Cover changed.",
        toast_cover_found: "Found!",
        toast_cover_not_found: "Not found.",
        toast_search_error: "Error.",
        toast_edit_mode: "Edit mode.",
        toast_genre_added_already: "Already exists.",
        toast_genre_limit: "Max 3.",
        toast_select_genre: "Select.",
        toast_type_genre: "Type.",
        toast_changes_saved: "Saved",
        toast_album_added: "Added",
        toast_album_removed: "Removed",
        toast_filtered_genre: "Filter:",
        tooltip_filter_artist: "Filter by Artist",
        tooltip_filter_genre: "Filter by Genre",
        tooltip_filter_year: "Filter by Year",
        tooltip_filter_label: "Filter by Label",
        tooltip_sort_added: "Sort by Date Updated",
        tooltip_sort_year: "Sort by Release Date",
        tooltip_sort_rating: "Sort by Rating",
        tooltip_grid_normal: "Normal View",
        tooltip_grid_small: "Small View",
        tooltip_grid_xsmall: "Compact View",
        tooltip_sort_artist_rating: "Sort by Average Rating",
        tooltip_sort_artist_count: "Sort by Rated Albums Count",
        note: "Note",
        save_note: "Save Note",
        note_placeholder: "Write your notes here...",
        album_note: "Album Note",
        track_note: "Track Note",
        track_notes: "Track Notes",
        all_notes: "All Notes",
        copy_notes: "Copy Notes",
        toast_notes_copied: "Notes copied!",
        cancel: "Cancel",
        rating_dist: "Rating Distribution (Tracks)",
        decade_breakdown: "Average Score by Decade",
        listening_trends: "Average Rating Trends Over Time",
    },
    tr: {
        app_title: "RateAgainst",
        nav_library: "Kitaplığım",
        nav_search: "Ara",
        nav_stats: "İstatistik",
        menu_settings: "Menü & Ayarlar",
        language_label: "Dil / Language",
        theme_label: "Tema / Theme",
        nav_data: "Veri",
        export_json: "Yedek Al (JSON)",
        import_json: "Yedek Yükle",
        export_4_5_star: "Favori (4-5 Yıldız) Parçalar",
        artists: "Sanatçılar",
        search_artist: "Sanatçı ara...",
        all_artists: "Tümü (Sanatçı)",
        all_genres: "Tümü (Tür)",
        all_years: "Tümü (Yıl)",
        all_labels: "Tümü (Şirket)",
        no_albums: "Kitaplık Boş",
        no_albums_desc: "Dinlediğin albümleri bul, puanla ve arşivini oluştur.",
        add_first_album: "Albüm Ekle",
        what_listening: "Ne dinliyorsun?",
        artist_disco: "Sanatçı",
        by_album: "Albüm",
        search_btn: "Ara",
        search_db: "Veritabanı aranıyor...",
        music_taste: "Müzik Zevkin",
        unique_artists: "Sanatçı",
        total_albums: "Albüm",
        overall_avg: "Ortalama",
        favorite_albums: "Favori Albümlerin",
        rated_artists: "Sanatçılar",
        music_genres: "Türler",
        image_link: "Görsel URL",
        apply_url: "Uygula",
        search_itunes: "iTunes Ara",
        album_avg: "Albüm Ortalaması",
        tracklist: "Şarkı Listesi",
        default_sort: "Varsayılan",
        sort_by_rating: "Puana Göre",
        favorite_tracks: "Favoriler",
        copy_list: "Listeyi Kopyala",
        add_genre: "Tür Ekle",
        type_genres_comma: "Eklemek istediğiniz türleri <span class=\"font-bold text-gray-800 dark:text-gray-200\">virgülle ayırarak</span> (Maks. 3) yazabilirsiniz.",
        auto_find: "Oto Bul",
        add: "Ekle",
        update: "Güncelle",
        remove: "Kaldır",
        add_new_track: "Parça Ekle",
        unknown: "Bilinmiyor",
        independent: "Bağımsız",
        no_cover: "Yok",
        studio_album: "Albüm",
        ep: "EP",
        added_to_lib: "Eklendi",
        added: "Güncellendi",
        searching_artist: "Sanatçı aranıyor...",
        searching_albums: "Albümler aranıyor...",
        fetching_albums: "Albümler yükleniyor:",
        no_studio_albums: "Veri yok.",
        no_results: "Bulunamadı.",
        try_full_names: "Tam ad deneyin.",
        no_saved_artists: "Boş.",
        error_loading: "Hata.",
        no_tracks: "Parça yok.",
        no_data: "Veri yok.",
        placeholder_artist: "Sanatçı/grup adı yazın...",
        placeholder_album: "Albüm adı yazın...",
        toast_no_export: "Boş.",
        toast_export_success: "İndirildi.",
        toast_import_success: "eklendi.",
        toast_import_error: "Hata.",
        toast_no_5star: "Yok.",
        toast_copied: "Kopyalandı!",
        toast_copy_fail: "Başarısız.",
        toast_conn_error: "Ağ hatası.",
        toast_auto_genre_success: "tür eklendi.",
        toast_auto_genre_info: "Yeni tür yok.",
        toast_auto_genre_fail: "Bulunamadı.",
        toast_cover_applied: "Kapak değişti.",
        toast_cover_found: "Bulundu!",
        toast_cover_not_found: "Bulunamadı.",
        toast_search_error: "Hata.",
        toast_edit_mode: "Düzenleme modu.",
        toast_genre_added_already: "Zaten var.",
        toast_genre_limit: "Maks. 3",
        toast_select_genre: "Seçiniz.",
        toast_type_genre: "Yazınız.",
        toast_changes_saved: "Kaydedildi",
        toast_album_added: "Eklendi",
        toast_album_removed: "Silindi",
        toast_filtered_genre: "Filtre:",
        tooltip_filter_artist: "Sanatçılara Göre Filtrele",
        tooltip_filter_genre: "Türlere Göre Filtrele",
        tooltip_filter_year: "Yıllara Göre Filtrele",
        tooltip_filter_label: "Şirkete Göre Filtrele",
        tooltip_sort_added: "Güncelleme Tarihine Göre Sırala",
        tooltip_sort_year: "Çıkış Tarihine Göre Sırala",
        tooltip_sort_rating: "Puanına Göre Sırala",
        tooltip_grid_normal: "Normal Görünüm",
        tooltip_grid_small: "Küçük Görünüm",
        tooltip_grid_xsmall: "Çok Küçük Görünüm",
        tooltip_sort_artist_rating: "Ortalama Puana Göre Sırala",
        tooltip_sort_artist_count: "Puanlanan Albüm Sayısına Göre Sırala",
        note: "Not",
        save_note: "Notu Kaydet",
        note_placeholder: "Notlarınızı buraya yazın...",
        album_note: "Albüm Notu",
        track_note: "Şarkı Notu",
        track_notes: "Şarkı Notları",
        all_notes: "Tüm Notlar",
        copy_notes: "Notları Kopyala",
        toast_notes_copied: "Notlar kopyalandı!",
        albums: "albüm",
        cancel: "İptal",
        rating_dist: "Puan Dağılımı (Parçalar)",
        decade_breakdown: "Dönemlere Göre Ortalama Puan",
        listening_trends: "Aylara Göre Puanlama Eğilimi",
    }
};

const AppState = {
    library: [], currentView: 'library', currentModalAlbum: null, isSearching: false,
    gridSize: localStorage.getItem('albumDiaryGridSize') || 'normal',
    sortBy: localStorage.getItem('albumDiarySortBy') || 'dateAdded',
    sortDirection: localStorage.getItem('albumDiarySortDirection') || 'desc',
    statsArtistSortBy: localStorage.getItem('albumDiaryStatsSortBy') || 'rating',
    statsArtistSortDirection: localStorage.getItem('albumDiaryStatsSortDirection') || 'desc',
    language: localStorage.getItem('albumDiaryLang') || 'tr',
    modalTrackSort: localStorage.getItem('albumDiaryModalTrackSort') || 'default', 
    
    filterGroup: '', filterGenre: '', filterYear: '', filterLabel: '',
    currentAllNotesRawText: ''
};

function t(key) { return Translations[AppState.language][key] || key; }

function tGenre(genreString) {
    if (!genreString) return '';
    const normalized = genreString.trim();
    for (let key in GenreTranslations) {
        if (key.toLowerCase() === normalized.toLowerCase() || GenreTranslations[key].tr.toLowerCase() === normalized.toLowerCase()) {
            return GenreTranslations[key][AppState.language];
        }
    }
    return normalized;
}

const Utils = {
    escapeHTML(str) {
        if (!str) return '';
        return str.toString().replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
    },
    debounce(func, wait) {
        let timeout; return function(...args) { clearTimeout(timeout); timeout = setTimeout(() => func(...args), wait); };
    },
    formatDateEN(dateStr) { return dateStr; }
};

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if(!container) return;
    const toast = document.createElement('div');
    const colors = { success: 'bg-green-600', error: 'bg-red-600', info: 'bg-gray-800 dark:bg-gray-200 text-white dark:text-black' };
    const textColor = type === 'info' ? 'text-white dark:text-black' : 'text-white';
    toast.className = `${colors[type]} ${textColor} px-4 py-3 rounded-2xl shadow-xl text-sm font-bold transform transition-all duration-300 -translate-y-10 opacity-0 flex items-center justify-center gap-2 mx-auto w-max`;
    let icon = type === 'success' ? 'check-circle' : (type === 'error' ? 'warning-circle' : 'info');
    toast.innerHTML = `<i class="ph-fill ph-${icon} text-lg"></i> <span>${Utils.escapeHTML(message)}</span>`;
    container.appendChild(toast);
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.remove('-translate-y-10', 'opacity-0')));
    setTimeout(() => { toast.classList.add('-translate-y-10', 'opacity-0'); setTimeout(() => toast.remove(), 300); }, 2500);
}

const app = {
    isEditMode: false,
    currentDropdownType: null,
    currentNoteTarget: null,
    draggedGenreIndex: null,
    isNoteEditMode: false,
    chartInstances: {},
    
    init() {
        this.updateLanguageUI();
        this.updateThemeIcon();
        this.debouncedSidebarSearch = Utils.debounce((e) => this.filterSidebarArtists(e.target.value), 300);
        this.setGridSize(AppState.gridSize);
        this.updateSortClasses();
        this.showView('library');
        this.updateSearchPlaceholder();
        this.updateModalTrackSortButtons();

        // Listen for Authentication State Changes in Supabase
        window.supabase.auth.onAuthStateChange((event, session) => {
            const loginBtn = document.getElementById('header-login-btn');
            
            if (session?.user) {
                // Logged In: Hide the header button and fetch data
                if(loginBtn) loginBtn.classList.add('hidden');
                this.loadData(); 
            } else {
                // Logged Out: Show the header button and clear screen
                AppState.library = [];
                this.renderLibrary();
                this.renderStats();
                if(loginBtn) loginBtn.classList.remove('hidden');
            }
        });

        document.addEventListener('click', (e) => {
            const dd = document.getElementById('custom-dropdown');
            if(dd && !dd.contains(e.target) && !e.target.closest('[onclick^="app.openDropdown"]')) {
                this.closeDropdown();
            }
        });
    },

    toggleSidebar(forceState) {
        const sidebar = document.getElementById('right-sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');
        if(!sidebar || !backdrop) return;
        
        const isOpen = forceState !== undefined ? forceState : sidebar.classList.contains('translate-x-full');
        
        if (isOpen) {
            backdrop.classList.remove('hidden');
            void backdrop.offsetWidth;
            backdrop.classList.remove('opacity-0');
            sidebar.classList.remove('translate-x-full');
            const searchEl = document.getElementById('sidebar-search');
            if(searchEl) searchEl.value = ''; 
            this.renderSidebarArtists();
        } else {
            backdrop.classList.add('opacity-0');
            sidebar.classList.add('translate-x-full');
            setTimeout(() => backdrop.classList.add('hidden'), 300);
        }
    },

    showView(viewName) {
        this.closeModal();
        this.closeDropdown();
        if (typeof this.closeGenreModal === 'function') this.closeGenreModal();
        this.closeNotePanel();
        if (typeof this.closeAllNotesModal === 'function') this.closeAllNotesModal();
        
        const exportModal = document.getElementById('export-playlist-modal');
        if(exportModal) exportModal.classList.add('hidden');
        
        ['library', 'search', 'stats'].forEach(v => {
            const btn = document.getElementById(`nav-${v}`);
            const icon = document.getElementById(`nav-icon-${v}`);
            if (v === viewName) {
                btn?.classList.add('text-primary', 'bg-primary/10'); 
                btn?.classList.remove('text-gray-400', 'dark:text-gray-500', 'hover:bg-lightHighlight', 'dark:hover:bg-gray-800');
                icon?.classList.add('ph-fill'); 
                icon?.classList.remove('ph');
            } else {
                btn?.classList.remove('text-primary', 'bg-primary/10'); 
                btn?.classList.add('text-gray-400', 'dark:text-gray-500', 'hover:bg-lightHighlight', 'dark:hover:bg-gray-800');
                icon?.classList.remove('ph-fill'); 
                icon?.classList.add('ph');
            }
        });

        document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
        
        const currentViewEl = document.getElementById(`view-${viewName}`);
        if(currentViewEl) currentViewEl.classList.remove('hidden');
        
        AppState.currentView = viewName;

        if (viewName === 'library') { 
            this.renderLibrary(); 
        } 
        else if (viewName === 'stats') { this.renderStats(); }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    toggleLanguage() {
        AppState.language = AppState.language === 'en' ? 'tr' : 'en';
        localStorage.setItem('albumDiaryLang', AppState.language);
        this.updateLanguageUI();
        this.updateSearchPlaceholder();
        
        if (AppState.currentModalAlbum && !document.getElementById('album-modal').classList.contains('hidden')) {
            this.updateModalUI();
            
            if (this.currentNoteTarget) {
                const titleSpan = document.querySelector('#note-modal-title span');
                if (titleSpan) {
                    titleSpan.textContent = t(this.currentNoteTarget.type === 'album' ? 'album_note' : 'track_note');
                }
            }
        }
        
        if (AppState.currentView === 'library') this.renderLibrary();
        else if (AppState.currentView === 'stats') this.renderStats();
    },

    updateLanguageUI() {
        const langIcon = document.getElementById('lang-icon');
        if (langIcon) langIcon.textContent = AppState.language === 'en' ? 'TR' : 'EN';
        document.querySelectorAll('[data-i18n]').forEach(el => el.innerHTML = Translations[AppState.language][el.getAttribute('data-i18n')] || el.innerHTML);
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => el.placeholder = Translations[AppState.language][el.getAttribute('data-i18n-placeholder')] || el.placeholder);
        document.querySelectorAll('[data-i18n-title]').forEach(el => el.title = Translations[AppState.language][el.getAttribute('data-i18n-title')] || el.title);
    },

    toggleTheme() {
        const html = document.documentElement;
        const meta = document.getElementById('meta-theme-color');
        if (html.classList.contains('dark')) {
            html.classList.remove('dark'); localStorage.setItem('theme', 'light');
            if(meta) meta.setAttribute('content', '#f7f4f0');
        } else {
            html.classList.add('dark'); localStorage.setItem('theme', 'dark');
            if(meta) meta.setAttribute('content', '#1c140f');
        }
        this.updateThemeIcon();
        if (AppState.currentView === 'stats') this.renderStats();
    },

    updateThemeIcon() {
        const icon = document.getElementById('theme-icon');
        if(!icon) return;
        if (document.documentElement.classList.contains('dark')) {
            icon.className = 'ph-fill ph-moon text-lg px-1 text-yellow-400';
        } else {
            icon.className = 'ph-fill ph-sun text-lg px-1 text-amber-500';
        }
    },

    async signIn() {
        // Note: For Google Auth, Supabase requires you to put your Google Cloud credentials in the Supabase Dashboard.
        // If you haven't done that yet, you can change 'google' to 'github' or 'discord' for instant testing.
        const { error } = await window.supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        if (error) {
            console.error("Giriş hatası:", error.message);
            showToast("Giriş yapılamadı.", "error");
        }
    },

    async signOut() {
        await window.supabase.auth.signOut();
        this.toggleSidebar(false);
        showToast("Çıkış yapıldı.", "info");
    },

    async loadData() {
        const { data: { session } } = await window.supabase.auth.getSession();
        if (!session) return; // Stop if not logged in

        try {
            const { data, error } = await window.supabase
                .from('kitaplik')
                .select('album_data')
                .eq('user_id', session.user.id); // Securely fetch only this user's rows
                
            if (error) throw error;

            AppState.library = data ? data.map(row => row.album_data) : [];
            
            if (AppState.currentView === 'library') this.renderLibrary();
            if (AppState.currentView === 'stats') this.renderStats();
            
            console.log(`Veritabanından ${AppState.library.length} albüm çekildi!`);
        } catch (e) {
            console.error("Buluttan veri çekilirken hata: ", e.message);
            AppState.library = [];
        }
    },
    
    async saveAlbumData(album) { 
        try {
            const { data: { session } } = await window.supabase.auth.getSession();
            if (!session) return;

            const { error } = await window.supabase
                .from('kitaplik')
                .upsert({ 
                    id: album.id.toString(), 
                    album_data: album,
                    user_id: session.user.id // This links the album to the user
                });
                
            if (error) throw error;
        } catch (e) {
            console.error("Buluta kaydederken hata: ", e.message);
        }
    },

    async deleteAlbumData(id) {
        try {
            const { error } = await window.supabase
                .from('kitaplik')
                .delete()
                .eq('id', id.toString());
                
            if (error) throw error;
        } catch (e) {
            console.error("Buluttan silerken hata: ", e.message);
        }
    },
    
    exportData() {
        if (AppState.library.length === 0) { showToast(t("toast_no_export"), "error"); return; }
        const data = JSON.stringify(AppState.library, null, 2);
        const blob = new Blob([data], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `album_diary_${Date.now()}.json`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
        showToast(t("toast_export_success"), "success");
    },

    importData(event) {
        const file = event.target.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                if (Array.isArray(importedData)) {
                            const currentIds = new Set(AppState.library.map(a => a.id)); let added = 0;
                            importedData.forEach(album => { 
                                if(album.id && !currentIds.has(album.id)) { 
                                    AppState.library.push(album); 
                                    this.saveAlbumData(album); // Save directly to collection
                                    added++; 
                                } 
                            });
                            this.renderLibrary(); this.renderStats();
                            showToast(`${added} ${t("toast_import_success")}`, "success");
                        }
            } catch (err) { showToast(t("toast_import_error"), "error"); }
            event.target.value = ''; 
        };
        reader.readAsText(file);
    },

    exportHighRatedTracks() {
        let list = [];
        AppState.library.forEach(album => {
            if (album.tracks) album.tracks.forEach(track => { if (track.rating >= 4) list.push(`${album.artist} - ${track.title}`); });
        });
        if (list.length === 0) { showToast(t("toast_no_5star"), "error"); return; }
        const plArea = document.getElementById('playlist-textarea');
        const exModal = document.getElementById('export-playlist-modal');
        if(plArea && exModal) {
            plArea.value = list.join('\n');
            exModal.classList.remove('hidden');
            exModal.classList.add('flex');
        }
    },

    copyPlaylistToClipboard() {
        const ta = document.getElementById('playlist-textarea'); 
        if(!ta) return;
        ta.select(); ta.setSelectionRange(0, 99999);
        try { document.execCommand('copy'); showToast(t("toast_copied"), "success"); } catch (err) { showToast(t("toast_copy_fail"), "error"); }
    },

    openDropdown(event, type) {
        event.stopPropagation();
        const dd = document.getElementById('custom-dropdown');
        if(!dd) return;
        
        if (!dd.classList.contains('hidden') && this.currentDropdownType === type) {
            this.closeDropdown(); return;
        }

        const btn = event.currentTarget;
        const rect = btn.getBoundingClientRect();
        
        let items = new Set();
        let defLabel = '';
        
        if (type === 'Group') {
            AppState.library.forEach(a => { if(a.artist) items.add(a.artist); });
            defLabel = t('all_artists');
        } else if (type === 'Genre') {
            AppState.library.forEach(a => { if(a.genres) a.genres.forEach(g => items.add(g.trim())); });
            defLabel = t('all_genres');
        } else if (type === 'Year') {
            AppState.library.forEach(a => { 
                if(a.year) {
                    items.add(a.year); 
                    const decade = Math.floor(parseInt(a.year) / 10) * 10;
                    if (!isNaN(decade)) items.add(`${decade}s`);
                }
            });
            defLabel = t('all_years');
        } else if (type === 'Label') {
            AppState.library.forEach(a => { if(a.label && a.label !== t('unknown')) items.add(a.label); });
            defLabel = t('all_labels');
        }

        const currentVal = AppState[`filter${type}`];
        
        let html = `
            <div onclick="app.setFilter('${type}', '')" class="px-5 py-3 hover:bg-lightHighlight dark:hover:bg-surfaceHover cursor-pointer text-sm font-semibold flex justify-between items-center transition-colors border-b border-lightBorder/30 dark:border-gray-800/50 ${currentVal === '' ? 'text-primary' : 'text-gray-700 dark:text-gray-300'}">
                <span>${defLabel}</span>
                ${currentVal === '' ? '<i class="ph-bold ph-check text-lg"></i>' : ''}
            </div>
        `;
        
        let sortedItems = Array.from(items);
        if (type === 'Year') {
            sortedItems.sort((a, b) => {
                const aVal = a.toString().endsWith('s') ? parseInt(a) + 0.5 : parseInt(a);
                const bVal = b.toString().endsWith('s') ? parseInt(b) + 0.5 : parseInt(b);
                return bVal - aVal;
            });
        } else if (type === 'Genre') {
            sortedItems.sort((a, b) => tGenre(a).localeCompare(tGenre(b)));
        } else {
            sortedItems.sort();
        }

        sortedItems.forEach(item => {
            const isSelected = currentVal === item;
            const isDecade = type === 'Year' && item.toString().endsWith('s');
            const displayLabel = type === 'Genre' ? tGenre(item) : item;
            
            html += `
                <div onclick="app.setFilter('${type}', '${Utils.escapeHTML(item)}')" class="px-5 py-3 hover:bg-lightHighlight dark:hover:bg-surfaceHover cursor-pointer text-sm ${isDecade ? 'font-bold bg-lightBg/50 dark:bg-surface/50 border-y border-lightBorder/30 dark:border-gray-800/50' : 'font-medium'} flex justify-between items-center transition-colors ${isSelected ? 'text-primary' : 'text-gray-600 dark:text-gray-400'}">
                    <span class="truncate pr-4 ${isDecade ? 'text-gray-800 dark:text-gray-200' : ''}">${Utils.escapeHTML(displayLabel)}</span>
                    ${isSelected ? '<i class="ph-bold ph-check text-lg"></i>' : ''}
                </div>
            `;
        });

        dd.innerHTML = html;
        this.currentDropdownType = type;
        
        dd.classList.remove('hidden');
        
        let top = rect.bottom + 10;
        let left = rect.left;
        
        const ddWidth = Math.max(200, btn.offsetWidth * 1.5);
        dd.style.minWidth = `${ddWidth}px`;
        
        if (left + ddWidth > window.innerWidth) {
            left = window.innerWidth - ddWidth - 16;
        }
        
        if (top + 250 > window.innerHeight) {
            top = rect.top - dd.offsetHeight - 10; 
        }
        
        dd.style.top = `${top}px`;
        dd.style.left = `${Math.max(16, left)}px`;
        
        requestAnimationFrame(() => dd.classList.remove('opacity-0'));
    },
    
    closeDropdown() {
        const dd = document.getElementById('custom-dropdown');
        if(dd && !dd.classList.contains('hidden')) {
            dd.classList.add('opacity-0');
            setTimeout(() => dd.classList.add('hidden'), 200);
            this.currentDropdownType = null;
        }
    },
    
    setFilter(type, value) {
        AppState[`filter${type}`] = value;
        this.closeDropdown();
        this.renderLibrary();
    },

    filterSidebarArtists(text) {
        const list = document.getElementById('sidebar-artist-list');
        if(!list) return;
        list.innerHTML = '';
        const artists = [...new Set(AppState.library.map(a => a.artist))].sort();
        const filtered = artists.filter(a => a.toLowerCase().includes(text.toLowerCase()));
        if(filtered.length === 0) {
            list.innerHTML = `<li class="p-3 text-center text-sm text-gray-500">${t('no_saved_artists')}</li>`;
            return;
        }
        const frag = document.createDocumentFragment();
        filtered.forEach(art => {
            const count = AppState.library.filter(a => a.artist === art).length;
            const li = document.createElement('li');
            li.className = 'px-3 py-2 hover:bg-lightHighlight dark:bg-surfaceHover cursor-pointer flex justify-between items-center rounded-lg';
            li.onclick = () => {
                this.setFilter('Group', art);
                this.toggleSidebar(false);
                this.showView('library');
                window.scrollTo(0,0);
            };
            li.innerHTML = `<span class="text-sm font-medium text-gray-800 dark:text-gray-200 truncate pr-2">${Utils.escapeHTML(art)}</span><span class="text-xs bg-lightBorder dark:bg-gray-800 px-2 py-0.5 rounded-full font-bold">${count}</span>`;
            frag.appendChild(li);
        });
        list.appendChild(frag);
    },
    
    renderSidebarArtists(text = '') { this.filterSidebarArtists(text); },

    searchFromLink(query) {
        this.closeModal();
        this.showView('search');
        
        const searchTypes = document.getElementsByName('searchType');
        for(let st of searchTypes) { 
            if(st.value === 'artist') st.checked = true; 
        }
        this.updateSearchPlaceholder();
        
        const searchInput = document.getElementById('search-input');
        if(searchInput) {
            searchInput.value = query;
            this.search();
        }
    },

    setGridSize(size) {
        AppState.gridSize = size; localStorage.setItem('albumDiaryGridSize', size);
        ['normal', 'small', 'xsmall'].forEach(s => {
            const btn = document.getElementById(`btn-grid-${s}`);
            if(btn) {
                if (s === size) {
                    btn.classList.add('text-primary', 'bg-primary/10');
                    btn.classList.remove('text-gray-500');
                } else {
                    btn.classList.remove('text-primary', 'bg-primary/10');
                    btn.classList.add('text-gray-500');
                }
            }
        });
        this.updateGridClasses(); if(AppState.currentView === 'library') this.renderLibrary();
    },
    
    updateGridClasses() {
        const grid = document.getElementById('library-grid'); if(!grid) return;
        if(AppState.gridSize === 'normal') grid.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3';
        else if(AppState.gridSize === 'small') grid.className = 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2';
        else grid.className = 'grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-10 gap-1.5';
    },
    
    toggleSort(type) {
        if (AppState.sortBy === type) AppState.sortDirection = AppState.sortDirection === 'desc' ? 'asc' : 'desc';
        else { AppState.sortBy = type; AppState.sortDirection = 'desc'; }
        localStorage.setItem('albumDiarySortBy', AppState.sortBy);
        localStorage.setItem('albumDiarySortDirection', AppState.sortDirection);
        this.updateSortClasses(); if (AppState.currentView === 'library') this.renderLibrary();
    },
    
    updateSortClasses() {
        ['dateAdded', 'year', 'rating'].forEach(type => {
            const btn = document.getElementById(`btn-sort-${type}`); const iconDir = document.getElementById(`icon-sort-${type}-dir`);
            if (!btn || !iconDir) return;
            if (AppState.sortBy === type) {
                btn.classList.add('text-primary', 'bg-primary/10'); btn.classList.remove('text-gray-500');
                iconDir.className = `ph-bold ph-arrow-${AppState.sortDirection === 'desc' ? 'down' : 'up'} text-[10px]`; iconDir.style.opacity = '1';
            } else {
                btn.classList.remove('text-primary', 'bg-primary/10'); btn.classList.add('text-gray-500');
                iconDir.className = 'ph-bold ph-arrow-down text-[10px]'; iconDir.style.opacity = '0.3';
            }
        });
    },

    renderLibrary() {
        const grid = document.getElementById('library-grid'), emptyState = document.getElementById('empty-library-state');
        if(!grid || !emptyState) return;
        
        const fGroup = AppState.filterGroup;
        const fYear = AppState.filterYear;
        const fGenre = AppState.filterGenre;
        const fLabel = AppState.filterLabel;
        
        document.getElementById('icon-filter-group')?.classList.toggle('text-primary', !!fGroup);
        document.getElementById('icon-filter-genre')?.classList.toggle('text-primary', !!fGenre);
        document.getElementById('icon-filter-year')?.classList.toggle('text-primary', !!fYear);
        document.getElementById('icon-filter-label')?.classList.toggle('text-primary', !!fLabel);

        let filtered = AppState.library.filter(a => {
            if (fGroup && a.artist !== fGroup) return false;
            
            if (fYear) {
                if (fYear.endsWith('s')) {
                    const targetDecade = parseInt(fYear);
                    const albumYear = parseInt(a.year);
                    if (isNaN(albumYear) || albumYear < targetDecade || albumYear >= targetDecade + 10) return false;
                } else if (a.year !== fYear) {
                    return false;
                }
            }
            
            if (fGenre && (!a.genres || !a.genres.some(g => g.toLowerCase() === fGenre.toLowerCase()))) return false;
            if (fLabel && a.label !== fLabel) return false;

            return true;
        });
        
        filtered.sort((a, b) => {
            const dir = AppState.sortDirection === 'desc' ? 1 : -1;
            if (AppState.sortBy === 'rating') return ((b.averageScore || 0) - (a.averageScore || 0)) * dir;
            if (AppState.sortBy === 'year') return ((parseInt(b.year) || 0) - (parseInt(a.year) || 0)) * dir;
            return (new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0)) * dir;
        });

        if (AppState.library.length === 0) { grid.innerHTML = ''; emptyState.classList.remove('hidden'); emptyState.classList.add('flex'); return; }
        emptyState.classList.add('hidden'); emptyState.classList.remove('flex'); grid.innerHTML = '';
        if (filtered.length === 0) { grid.innerHTML = `<div class="col-span-full text-center py-10 text-gray-500">${t('no_data')}</div>`; return; }

        const fragment = document.createDocumentFragment();
        
        const isXSmall = AppState.gridSize === 'xsmall';
        const isSmall = AppState.gridSize === 'small';
        
        const titleSize = isXSmall ? 'text-[10px]' : (isSmall ? 'text-xs' : 'text-sm');
        const artistSize = isXSmall ? 'text-[9px]' : (isSmall ? 'text-[10px]' : 'text-xs');
        const metaSize = isXSmall ? 'text-[8px]' : (isSmall ? 'text-[9px]' : 'text-[10px]');
        const padding = isXSmall ? 'p-1.5' : (isSmall ? 'p-2' : 'p-3');
        const gapSize = isXSmall ? 'gap-1' : (isSmall ? 'gap-1.5' : 'gap-2 md:gap-3');
        const circleSize = isXSmall ? 'w-5 h-5 text-[9px] border' : (isSmall ? 'w-7 h-7 text-xs border-2' : 'w-10 h-10 text-sm border-2');

        const noCoverText = t('no_cover').replace(/ /g, '+');

        filtered.forEach(album => {
            const avg = album.averageScore || 0;
            const rawGenre = (album.genres && album.genres.length > 0) ? album.genres[0] : t('unknown');
            const displayGenre = tGenre(rawGenre);

            const hasNotes = album.note || (album.tracks && album.tracks.some(tr => tr.note));

            let bottomBgClass = 'bg-[#2a2a2a]'; 
            let borderColorClass = 'border-[#3a3a3a] dark:border-[#333]';
            let titleColorClass = 'text-white';
            let subTextColorClass = 'text-gray-300';
            let genreBgClass = 'bg-white/10 text-gray-200';
            let circleClass = 'bg-gray-800 text-gray-400 border-gray-600';

            if (avg >= 4.5) { 
                bottomBgClass = 'bg-[#1e3a8a]'; 
                borderColorClass = 'border-[#1e40af] shadow-[#1e3a8a]/20';
                subTextColorClass = 'text-blue-100/80';
                genreBgClass = 'bg-white/20 text-blue-50';
                circleClass = 'bg-[#172554] text-[#93c5fd] border-[#1e40af]';
            } else if (avg >= 4.0) { 
                bottomBgClass = 'bg-[#14532d]'; 
                borderColorClass = 'border-[#166534] shadow-[#14532d]/20';
                subTextColorClass = 'text-green-100/80';
                genreBgClass = 'bg-white/20 text-green-50';
                circleClass = 'bg-[#064e3b] text-[#86efac] border-[#166534]';
            } else if (avg >= 3.5) { 
                bottomBgClass = 'bg-[#15803d]'; 
                borderColorClass = 'border-[#22c55e] shadow-[#15803d]/20';
                subTextColorClass = 'text-green-100/90';
                genreBgClass = 'bg-white/20 text-green-50';
                circleClass = 'bg-[#166534] text-[#bbf7d0] border-[#22c55e]';
            } else if (avg >= 3.0) { 
                bottomBgClass = 'bg-[#a16207]'; 
                borderColorClass = 'border-[#ca8a04] shadow-[#a16207]/20';
                subTextColorClass = 'text-yellow-100/80';
                genreBgClass = 'bg-white/20 text-yellow-50';
                circleClass = 'bg-[#854d0e] text-[#fef08a] border-[#ca8a04]';
            } else if (avg >= 2.5) { 
                bottomBgClass = 'bg-[#c2410c]'; 
                borderColorClass = 'border-[#ea580c] shadow-[#c2410c]/20';
                subTextColorClass = 'text-orange-100/80';
                genreBgClass = 'bg-white/20 text-orange-50';
                circleClass = 'bg-[#9a3412] text-[#fed7aa] border-[#ea580c]';
            } else if (avg > 0) { 
                bottomBgClass = 'bg-[#991b1b]'; 
                borderColorClass = 'border-[#dc2626] shadow-[#991b1b]/20';
                subTextColorClass = 'text-red-100/80';
                genreBgClass = 'bg-white/20 text-red-50';
                circleClass = 'bg-[#7f1d1d] text-[#fca5a5] border-[#dc2626]';
            } else { 
                bottomBgClass = 'bg-white dark:bg-surfaceHover';
                borderColorClass = 'border-lightBorder dark:border-gray-800';
                titleColorClass = 'text-gray-900 dark:text-white';
                subTextColorClass = 'text-gray-500 dark:text-gray-400';
                genreBgClass = 'bg-lightBg dark:bg-white/10 text-gray-700 dark:text-gray-300';
                circleClass = 'bg-lightBg text-gray-500 border-lightBorder dark:bg-darker dark:text-gray-500 dark:border-gray-800';
            }

            const card = document.createElement('div');
            card.className = `flex flex-col rounded-xl overflow-hidden cursor-pointer active:scale-[0.98] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:brightness-105 dark:hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)] shadow-md border ${borderColorClass} h-full`;
            card.onclick = () => this.openAlbumModal(album.id, album.title, album.artist, album.year);

            const coverToUse = Utils.escapeHTML(album.customCoverUrl || album.coverUrl);
            const paperclipColorClass = subTextColorClass; 

            card.innerHTML = `
                <div class="relative w-full pt-[100%] shrink-0 overflow-hidden bg-lightHighlight dark:bg-[#1a1a1a] border-b border-lightBorder/50 dark:border-white/5">
                    <img loading="lazy" src="${coverToUse}" onerror="this.src='https://placehold.co/400x400/ebe4dc/594636?text=${noCoverText}'; this.onerror=null;" alt="Cover" class="absolute inset-0 w-full h-full object-cover object-center">
                </div>
                <div class="flex ${padding} ${gapSize} ${bottomBgClass} flex-grow items-center">
                    <div class="shrink-0 flex flex-col items-center justify-center gap-1.5">
                        <div class="flex items-center justify-center rounded-full font-black ${circleSize} ${circleClass} shadow-sm">
                            ${avg > 0 ? avg : '-'}
                        </div>
                        <button ${hasNotes ? `onclick="event.stopPropagation(); app.showAllNotes('${album.id}')"` : ''} class="${paperclipColorClass} transition-opacity ${hasNotes ? 'hover:opacity-75 cursor-pointer' : 'invisible pointer-events-none'}" data-i18n-title="all_notes" title="Tüm Notlar"><i class="ph-bold ph-paperclip text-lg"></i></button>
                    </div>
                    <div class="flex flex-col justify-center min-w-0 flex-1 w-full h-full">
                        <h3 class="font-bold ${titleColorClass} line-clamp-2 ${titleSize} leading-tight italic" title="${Utils.escapeHTML(album.title)}">${Utils.escapeHTML(album.title)}</h3>
                        <div class="flex items-center min-w-0 mt-0.5 mb-1 w-full">
                            <button onclick="event.stopPropagation(); app.searchFromLink(this.textContent)" class="${subTextColorClass} truncate ${artistSize} hover:underline cursor-pointer text-left max-w-full" title="${Utils.escapeHTML(album.artist)}">${Utils.escapeHTML(album.artist)}</button>
                        </div>
                        <div class="flex justify-between items-end gap-1 w-full mt-auto">
                            <span class="${metaSize} font-semibold ${subTextColorClass} truncate text-left" style="max-width: 70%;">${Utils.escapeHTML(displayGenre)}</span>
                            <div class="flex gap-1 shrink-0 items-center">
                                <span class="${metaSize} font-bold ${genreBgClass} px-1.5 py-0.5 rounded-md text-right">${Utils.escapeHTML(album.year)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            fragment.appendChild(card);
        });
        grid.appendChild(fragment);
    },

    updateSearchPlaceholder() {
        const inp = document.getElementById('search-input');
        const searchTypes = document.getElementsByName('searchType');
        let tType = 'artist';
        for(let st of searchTypes) { if(st.checked) tType = st.value; }
        if(inp) inp.placeholder = tType === 'artist' ? t('placeholder_artist') : t('placeholder_album');
    },
    
    async search() {
        if (AppState.isSearching) return;
        const input = document.getElementById('search-input').value.trim(); if (!input) return;
        AppState.isSearching = true; 
        const btnSearch = document.getElementById('search-btn');
        if(btnSearch) btnSearch.disabled = true;
        
        let searchType = 'artist';
        const searchTypes = document.getElementsByName('searchType');
        for(let st of searchTypes) { if(st.checked) searchType = st.value; }
        
        const resCon = document.getElementById('search-results');
        const load = document.getElementById('search-loading');
        const statText = document.getElementById('search-status-text');
        
        if(resCon) resCon.innerHTML = ''; 
        if(load) { load.classList.remove('hidden'); load.classList.add('flex'); }
        if(statText) statText.textContent = searchType === 'artist' ? t('searching_artist') : t('searching_albums');

        try {
            if (searchType === 'album') {
                const res = await fetch(`https://musicbrainz.org/ws/2/release-group/?query=${encodeURIComponent(input)} AND (type:album OR type:ep)&fmt=json&limit=50`);
                const data = await res.json();
                const albums = (data['release-groups'] || []).filter(rg => 
                    (rg['primary-type'] === 'Album' || rg['primary-type'] === 'EP') && 
                    (!rg['secondary-types'] || rg['secondary-types'].length === 0)
                ).slice(0, 15);
                
                if (albums.length === 0 && resCon) { resCon.innerHTML = `<div class="col-span-full text-center p-8 text-gray-500">${t('no_results')}</div>`; return; }
                this.renderSearchResults(albums);
            } else {
                const aRes = await fetch(`https://musicbrainz.org/ws/2/artist/?query=${encodeURIComponent(input)}&fmt=json&limit=1`);
                const aData = await aRes.json();
                if ((!aData.artists || aData.artists.length === 0) && resCon) { resCon.innerHTML = `<div class="col-span-full text-center p-8 text-gray-500">${t('no_results')}</div>`; return; }
                const artist = aData.artists[0]; 
                if(statText) statText.textContent = `${t('fetching_albums')} "${artist.name}"...`;
                
                const relRes = await fetch(`https://musicbrainz.org/ws/2/release-group?artist=${artist.id}&type=album|ep&fmt=json&limit=100`);
                const rData = await relRes.json();
                const albums = (rData['release-groups'] || []).filter(rg => 
                    (rg['primary-type'] === 'Album' || rg['primary-type'] === 'EP') && 
                    (!rg['secondary-types'] || rg['secondary-types'].length === 0)
                );
                
                if (albums.length === 0 && resCon) { resCon.innerHTML = `<div class="col-span-full text-center p-8 text-gray-500">${t('no_studio_albums')}</div>`; return; }
                this.renderSearchResults(albums.sort((a,b)=>(b['first-release-date']||'0000').localeCompare(a['first-release-date']||'0000')), artist.name);
            }
        } catch (e) { showToast(t('toast_conn_error'), "error"); } 
        finally { 
            if(load) { load.classList.add('hidden'); load.classList.remove('flex'); }
            AppState.isSearching = false; 
            if(btnSearch) btnSearch.disabled = false; 
        }
    },

    renderSearchResults(albums, fallbackArtist = null) {
        const con = document.getElementById('search-results'); 
        if(!con) return;
        con.innerHTML = '';
        const frag = document.createDocumentFragment();
        const noCoverText = t('no_cover').replace(/ /g, '+');

        albums.forEach(al => {
            const mbid = al.id, title = Utils.escapeHTML(al.title), artist = Utils.escapeHTML(al['artist-credit']?.[0]?.name || fallbackArtist || t('unknown'));
            const year = Utils.escapeHTML(al['first-release-date'] ? al['first-release-date'].substring(0, 4) : t('unknown'));
            const coverUrl = `https://coverartarchive.org/release-group/${mbid}/front-250`;
            const inLib = AppState.library.some(a => a.id === mbid);

            const card = document.createElement('div');
            card.className = `bg-white dark:bg-surface p-2.5 rounded-xl border ${inLib ? 'border-primary' : 'border-lightBorder dark:border-gray-800'} flex gap-3 active:scale-[0.98] transition-transform shadow-sm cursor-pointer hover:bg-lightHighlight dark:hover:bg-surfaceHover`;
            card.onclick = () => this.openAlbumModal(mbid, al.title, al['artist-credit']?.[0]?.name || fallbackArtist, year, coverUrl); 

            card.innerHTML = `
                <img loading="lazy" src="${coverUrl}" onerror="this.src='https://placehold.co/150x150/ebe4dc/594636?text=${noCoverText}'; this.onerror=null;" class="w-20 h-20 bg-lightHighlight rounded-lg object-cover flex-shrink-0">
                <div class="flex flex-col justify-center overflow-hidden flex-grow">
                    <h4 class="font-bold text-gray-900 dark:text-white truncate text-sm md:text-base italic">${title}</h4>
                    <p class="text-xs text-gray-500 truncate mb-1">${artist}</p>
                    <div class="flex gap-1.5 mt-1">
                        <span class="text-[10px] bg-lightBg dark:bg-darker px-2 py-0.5 rounded text-gray-600 font-bold">${year}</span>
                        <span class="text-[10px] bg-lightHighlight dark:bg-gray-800 px-2 py-0.5 rounded text-gray-600 dark:text-gray-300 font-bold">${al['primary-type'] === 'EP' ? 'EP' : t('studio_album')}</span>
                        ${inLib ? `<span class="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold flex items-center gap-1"><i class="ph-fill ph-check-circle"></i> ${t("added_to_lib")}</span>` : ''}
                    </div>
                </div>`;
            frag.appendChild(card);
        });
        con.appendChild(frag);
    },

    async openAlbumModal(mbid, title, artist, year, defCover = null) {
        const modal = document.getElementById('album-modal');
        const tl = document.getElementById('modal-tracklist');
        if(!modal || !tl) return;

        this.isEditMode = false; 
        document.getElementById('cover-edit-section')?.classList.add('hidden');
        document.getElementById('edit-mode-btn')?.classList.remove('bg-primary/20', 'text-primary');
        document.getElementById('auto-fetch-genre-btn')?.classList.add('hidden');
        
        modal.classList.remove('hidden');
        modal.classList.add('flex'); 
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => { 
                modal.classList.remove('opacity-0'); 
                const content = modal.querySelector('.modal-content');
                if (content) {
                    content.classList.remove('scale-95', 'opacity-0');
                    content.classList.add('scale-100', 'opacity-100');
                }
            });
        });
        
        tl.innerHTML = `<div class="flex justify-center p-8"><i class="ph-bold ph-spinner-gap animate-spin text-3xl text-primary"></i></div>`;
        
        let albumData = AppState.library.find(a => a.id === mbid);
        if (!albumData) {
            try {
                const res = await fetch(`https://musicbrainz.org/ws/2/release/?release-group=${mbid}&inc=recordings+labels+genres&fmt=json&limit=1`);
                const data = await res.json();
                let tracks = [], label = t("unknown"), country = t("unknown"), rDate = year, genres = [];
                if (data.releases && data.releases.length > 0) {
                    const rel = data.releases[0];
                    if(rel.date) rDate = rel.date; 
                    if(rel['label-info']?.length > 0) label = rel['label-info'][0].label?.name || t("independent");
                    if(rel.country) country = rel.country;
                    if(rel.genres?.length > 0) genres = rel.genres.sort((a,b)=>b.count-a.count).slice(0,3).map(g=>g.name.charAt(0).toUpperCase()+g.name.slice(1));
                    if(rel.media?.length > 0) {
                        let c = 1; tracks = rel.media.reduce((acc, m) => acc.concat(m.tracks.map(t => ({id:t.id, title:t.recording.title, number:(c++).toString(), rating:0}))), []);
                    }
                } else tracks = [{id:'1', title:t("no_tracks"), number:'1', rating:0}];
                
                albumData = { id: mbid, title: title||t('unknown'), artist: artist||t('unknown'), year: rDate.substring(0,4), label: label, country: country, coverUrl: defCover || `https://coverartarchive.org/release-group/${mbid}/front-500`, tracks: tracks, genres: genres, dateAdded: new Date().toISOString(), averageScore: 0 };
            } catch(e) { tl.innerHTML = `<div class="text-red-500 text-center p-4">${t('error_loading')}</div>`; return; }
        }
        AppState.currentModalAlbum = JSON.parse(JSON.stringify(albumData)); 
        this.updateModalUI();
    },

    closeModal() {
        const modal = document.getElementById('album-modal');
        if(!modal) return;
        const content = modal.querySelector('.modal-content');
        
        modal.classList.add('opacity-0');
        if (content) {
            content.classList.remove('scale-100', 'opacity-100');
            content.classList.add('scale-95', 'opacity-0');
        }
        
        setTimeout(() => { 
            modal.classList.add('hidden'); 
            modal.classList.remove('flex');
            AppState.currentModalAlbum = null; 
        }, 300);
    },

    updateModalUI() {
        const al = AppState.currentModalAlbum;
        if(!al) return;
        
        const setElText = (id, text) => { const el = document.getElementById(id); if(el) el.textContent = text; };
        
        setElText('modal-title', al.title);
        setElText('modal-artist', al.artist);
        setElText('modal-date', al.year);
        setElText('modal-label', al.label);
        
        const countryStr = al.country || t('unknown');
        setElText('modal-country', countryStr);
        this.updateCountryIcon(countryStr.trim().toLowerCase());
        
        const artistEl = document.getElementById('modal-artist');
        if (artistEl) {
            if (!this.isEditMode) {
                artistEl.classList.add('cursor-pointer', 'hover:underline', 'hover:text-primary');
                artistEl.onclick = () => app.searchFromLink(artistEl.textContent);
            } else {
                artistEl.classList.remove('cursor-pointer', 'hover:underline', 'hover:text-primary');
                artistEl.onclick = null;
            }
        }

        this.renderDateAdded();
        this.updateAlbumNoteIcon();

        const cov = document.getElementById('modal-cover'); 
        if(cov) cov.src = al.customCoverUrl || al.coverUrl;
        
        const blurBg = document.getElementById('modal-bg-blur');
        if(blurBg) blurBg.style.backgroundImage = `url('${Utils.escapeHTML(al.customCoverUrl || al.coverUrl)}')`;
        
        this.renderTracklist(); this.renderGenres(); this.updateModalButtons(); this.calculateAverageScore();
    },

    handleCountryInput(val) {
        const code = val.trim().toLowerCase();
        this.updateCountryIcon(code);
    },

    updateCountryIcon(code) {
        const container = document.getElementById('modal-country-icon-container');
        if (!container) return;
        
        if (code.length === 2 && /^[a-z]{2}$/.test(code)) {
            container.innerHTML = `<img src="https://flagcdn.com/24x18/${code}.png" alt="${code.toUpperCase()}" class="w-5 h-auto rounded-sm shadow-sm object-cover" onerror="this.onerror=null; this.outerHTML='<i class=\\'ph-bold ph-globe text-lg text-gray-400\\'></i>'">`;
        } else {
            container.innerHTML = `<i class="ph-bold ph-globe text-lg text-gray-400"></i>`;
        }
    },

    renderDateAdded() {
        const al = AppState.currentModalAlbum;
        if (!al) return;
        const d = new Date(al.dateAdded);
        const isValid = !isNaN(d.getTime());
        const formattedDate = isValid ? d.toLocaleDateString(AppState.language === 'en' ? 'en-US' : 'tr-TR') : '-';
        const isoDate = isValid ? d.toISOString().split('T')[0] : '';

        const dateAddedContainer = document.getElementById('modal-date-added-container');
        if (dateAddedContainer) {
            if (this.isEditMode) {
                dateAddedContainer.innerHTML = `
                    <div class="relative flex items-center gap-1.5 cursor-pointer bg-lightHighlight dark:bg-darker border border-dashed border-primary px-1.5 py-0.5 rounded active:scale-95 transition-transform w-fit" onclick="document.getElementById('added-date-picker').showPicker()">
                        <span class="text-[10px] font-bold text-gray-800 dark:text-gray-200">${formattedDate}</span>
                        <i class="ph-bold ph-arrows-clockwise text-primary text-xs"></i>
                        <input type="date" id="added-date-picker" value="${isoDate}" class="absolute opacity-0 pointer-events-none w-0 h-0" onchange="app.updateAddedDate(this.value); event.stopPropagation();">
                    </div>
                `;
            } else {
                dateAddedContainer.innerHTML = `<p id="modal-date-added" class="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">${formattedDate}</p>`;
            }
        }
    },

    updateAddedDate(val) {
        if (AppState.currentModalAlbum && val) {
            const newDate = new Date(val);
            if (!isNaN(newDate.getTime())) {
                AppState.currentModalAlbum.dateAdded = newDate.toISOString();
                this.updateModalUI();
            }
        }
    },

    toggleEditMode() {
        this.isEditMode = !this.isEditMode;
        const btn = document.getElementById('edit-mode-btn');
        const aBtn = document.getElementById('auto-fetch-genre-btn');
        
        if(this.isEditMode) { 
            btn?.classList.add('bg-primary/20', 'text-primary'); 
            aBtn?.classList.remove('hidden'); 
        } else { 
            btn?.classList.remove('bg-primary/20', 'text-primary'); 
            aBtn?.classList.add('hidden'); 
        }
        
        ['modal-title', 'modal-artist', 'modal-date', 'modal-label', 'modal-country'].forEach(id => {
            const el = document.getElementById(id); 
            if(el) {
                el.contentEditable = this.isEditMode;
                if(this.isEditMode) el.classList.add('border-b', 'border-dashed', 'border-primary', 'bg-lightHighlight', 'dark:bg-darker');
                else el.classList.remove('border-b', 'border-dashed', 'border-primary', 'bg-lightHighlight', 'dark:bg-darker');
            }
        });
        
        const artistEl = document.getElementById('modal-artist');
        if (artistEl) {
            if (this.isEditMode) {
                artistEl.classList.remove('cursor-pointer', 'hover:underline', 'hover:text-primary');
                artistEl.onclick = null;
            } else {
                artistEl.classList.add('cursor-pointer', 'hover:underline', 'hover:text-primary');
                artistEl.onclick = () => app.searchFromLink(artistEl.textContent);
            }
        }

        this.renderDateAdded();
        this.renderTracklist(); 
        this.renderGenres();
    },

    updateAlbumField(field, val) { if(AppState.currentModalAlbum) { AppState.currentModalAlbum[field] = val.trim(); this.updateModalButtons(); } },
    updateTrackField(idx, fld, val) { if(AppState.currentModalAlbum) { AppState.currentModalAlbum.tracks[idx][fld] = val.trim(); this.updateModalButtons(); } },
    
    toggleCoverEdit() { 
        const sec = document.getElementById('cover-edit-section');
        if(sec) sec.classList.toggle('hidden'); 
        const curl = document.getElementById('custom-cover-url');
        if(curl) curl.value = AppState.currentModalAlbum.customCoverUrl || AppState.currentModalAlbum.coverUrl; 
    },
    
    applyCustomCover() { 
        const input = document.getElementById('custom-cover-url');
        if(!input) return;
        const u = input.value.trim(); 
        if(u && AppState.currentModalAlbum) { 
            AppState.currentModalAlbum.customCoverUrl = u; 
            this.updateModalUI(); 
            document.getElementById('cover-edit-section')?.classList.add('hidden'); 
        } 
    },
    
    async searchiTunesCover() {
        const al = AppState.currentModalAlbum, btn = document.getElementById('itunes-search-btn'); 
        if(!al || !btn) return;
        const oH = btn.innerHTML; btn.innerHTML = `<i class="ph-bold ph-spinner animate-spin"></i>`;
        try {
            const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(al.artist+' '+al.title)}&entity=album&limit=1`);
            const data = await res.json();
            if(data.results?.length > 0) { 
                AppState.currentModalAlbum.customCoverUrl = data.results[0].artworkUrl100.replace('100x100bb','600x600bb'); 
                this.updateModalUI(); 
                document.getElementById('cover-edit-section')?.classList.add('hidden'); 
                showToast(t("toast_cover_found"), "success"); 
            } else {
                showToast(t("toast_cover_not_found"), "error");
            }
        } catch(e) { showToast(t("toast_search_error"), "error"); } finally { btn.innerHTML = oH; }
    },

    renderGenres() {
        const con = document.getElementById('modal-genres'); 
        if(!con) return;
        con.innerHTML = '';
        const al = AppState.currentModalAlbum; 
        if(!al) return;
        if(!al.genres) al.genres = [];
        
        al.genres.forEach((g, i) => {
            const displayG = tGenre(g);
            const tag = document.createElement('span');
            tag.className = `px-2 py-1 bg-lightBorder dark:bg-darker rounded-lg text-[10px] font-bold flex items-center gap-1 ${!this.isEditMode ? 'active:scale-95 cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors' : 'cursor-grab active:cursor-grabbing'}`;
            if(!this.isEditMode) { 
                tag.innerHTML = Utils.escapeHTML(displayG); 
                tag.onclick = (e) => { e.stopPropagation(); this.filterByGenre(g); }; 
            }
            else { 
                tag.innerHTML = `<i class="ph-bold ph-dots-six-vertical text-gray-400 mr-0.5"></i> ${Utils.escapeHTML(displayG)} <i class="ph-bold ph-x ml-1 cursor-pointer hover:text-red-500 p-0.5" onclick="app.removeGenre(${i})"></i>`; 
                
                tag.draggable = true;
                tag.dataset.index = i;
                tag.ondragstart = (e) => { app.draggedGenreIndex = i; e.dataTransfer.effectAllowed = 'move'; setTimeout(() => tag.classList.add('opacity-50'), 0); };
                tag.ondragend = (e) => { tag.classList.remove('opacity-50'); app.draggedGenreIndex = null; };
                tag.ondragover = (e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; };
                tag.ondragenter = (e) => { e.preventDefault(); tag.classList.add('scale-105', 'bg-primary/20'); };
                tag.ondragleave = (e) => { tag.classList.remove('scale-105', 'bg-primary/20'); };
                tag.ondrop = (e) => {
                    e.preventDefault();
                    tag.classList.remove('scale-105', 'bg-primary/20');
                    if (app.draggedGenreIndex !== null && app.draggedGenreIndex !== i) {
                        const draggedItem = AppState.currentModalAlbum.genres.splice(app.draggedGenreIndex, 1)[0];
                        AppState.currentModalAlbum.genres.splice(i, 0, draggedItem);
                        app.renderGenres();
                        app.updateModalButtons();
                    }
                };
            }
            con.appendChild(tag);
        });
        if(this.isEditMode && al.genres.length < 3) {
            const add = document.createElement('button'); add.className = 'px-2 py-1 bg-primary/20 text-primary rounded-lg text-[10px] font-bold flex items-center hover:bg-primary/30 transition-colors cursor-pointer';
            add.innerHTML = `<i class="ph-bold ph-plus"></i>`; add.onclick = () => this.promptAddGenre(); con.appendChild(add);
        }
    },
    
    async autoFetchGenres(fromModal = false) { 
        const al = AppState.currentModalAlbum;
        if (!al) return;
        
        const btn = document.getElementById('auto-fetch-genre-btn');
        const originalIcon = btn ? btn.innerHTML : '';
        if (btn) btn.innerHTML = `<i class="ph-bold ph-spinner animate-spin"></i>`;
        
        const modalBtnIcon = fromModal ? document.querySelector('#genre-selection-modal .ph-magic-wand') : null;
        if (modalBtnIcon) { modalBtnIcon.classList.remove('ph-magic-wand'); modalBtnIcon.classList.add('ph-spinner', 'animate-spin'); }
        
        try {
            let foundGenres = [];
            const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(al.artist + ' ' + al.title)}&entity=album&limit=1`);
            const data = await res.json();
            
            if (data.results?.length > 0 && data.results[0].primaryGenreName) {
                foundGenres.push(data.results[0].primaryGenreName);
            }

            if (foundGenres.length > 0) {
                if(!al.genres) al.genres = [];
                let added = 0;
                
                foundGenres.forEach(g => {
                    const formatted = g.charAt(0).toUpperCase() + g.slice(1);
                    if (!al.genres.includes(formatted) && al.genres.length < 3) {
                        al.genres.push(formatted);
                        added++;
                    }
                });

                if (added > 0) {
                    this.renderGenres();
                    this.updateModalButtons();
                    showToast(`${added} ${t("toast_auto_genre_success")}`, "success");
                    if (fromModal) this.closeGenreModal();
                } else {
                    showToast(t("toast_auto_genre_info"), "info");
                }
            } else {
                showToast(t("toast_auto_genre_fail"), "error");
            }
        } catch(e) { 
            showToast(t("toast_search_error"), "error"); 
        } finally {
            if (btn) btn.innerHTML = originalIcon;
            if (modalBtnIcon) { modalBtnIcon.classList.add('ph-magic-wand'); modalBtnIcon.classList.remove('ph-spinner', 'animate-spin'); }
        }
    },
    
    promptAddGenre() {
        const inp = document.getElementById('custom-genre-input');
        if(inp) inp.value = '';
        const mod = document.getElementById('genre-selection-modal');
        if(mod) {
            mod.classList.remove('hidden');
            mod.classList.add('flex');
            setTimeout(() => inp?.focus(), 100);
        }
    },
    
    confirmAddGenre() {
        const inp = document.getElementById('custom-genre-input');
        if(!inp) return;
        const input = inp.value.trim();
        if(!input || !AppState.currentModalAlbum) return;
        
        let newGenres = input.split(',').map(g => g.trim()).filter(g => g !== '');
        if(!AppState.currentModalAlbum.genres) AppState.currentModalAlbum.genres = [];
        
        for(let g of newGenres) {
            let formatted = g.charAt(0).toUpperCase() + g.slice(1);
            if(!AppState.currentModalAlbum.genres.includes(formatted) && AppState.currentModalAlbum.genres.length < 3) {
                AppState.currentModalAlbum.genres.push(formatted);
            }
        }
        
        this.renderGenres(); 
        this.updateModalButtons(); 
        this.closeGenreModal();
    },

    closeGenreModal() { 
        const mod = document.getElementById('genre-selection-modal');
        if(mod) { mod.classList.add('hidden'); mod.classList.remove('flex'); }
    },
    
    removeGenre(i) { 
        if(AppState.currentModalAlbum?.genres) {
            AppState.currentModalAlbum.genres.splice(i, 1); 
            this.renderGenres(); 
            this.updateModalButtons(); 
        }
    },
    
    filterByGenre(g) {
        this.closeModal(); this.showView('library');
        this.setFilter('Genre', g);
        window.scrollTo(0,0);
    },

    openNotePanel(type, index = null) {
        this.currentNoteTarget = { type, index };
        const modal = document.getElementById('note-modal');
        const textarea = document.getElementById('note-textarea');
        const display = document.getElementById('note-display');
        const titleSpan = document.querySelector('#note-modal-title span');
        const subtitle = document.getElementById('note-modal-subtitle');
        
        if(!modal || !textarea || !AppState.currentModalAlbum) return;
        
        let currentText = '';
        let titleKey = 'note';
        let subText = '';
        
        if (type === 'album') {
            currentText = AppState.currentModalAlbum.note || '';
            titleKey = 'album_note';
            subText = `${AppState.currentModalAlbum.artist} • ${AppState.currentModalAlbum.title}`;
        } else if (type === 'track' && index !== null) {
            const track = AppState.currentModalAlbum.tracks.find(t => t.originalIndex === index) || AppState.currentModalAlbum.tracks[index];
            currentText = track.note || '';
            titleKey = 'track_note';
            subText = `${track.number}. ${track.title}`;
        }
        
        textarea.value = currentText;
        if(display) display.textContent = currentText;
        
        if(titleSpan) titleSpan.textContent = t(titleKey);
        if(subtitle) subtitle.textContent = subText;
        
        if (!currentText || currentText.trim() === '') {
            this.setNoteEditMode(true);
            textarea.value = '• ';
        } else {
            this.setNoteEditMode(false);
        }
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        requestAnimationFrame(() => {
            modal.classList.remove('opacity-0');
            modal.querySelector('div').classList.remove('scale-95');
            if (this.isNoteEditMode) textarea.focus();
        });
    },

    setNoteEditMode(isEdit) {
        this.isNoteEditMode = isEdit;
        const display = document.getElementById('note-display');
        const textarea = document.getElementById('note-textarea');
        const footer = document.getElementById('note-modal-footer');
        const editBtn = document.getElementById('note-edit-btn');

        if (!display || !textarea || !footer || !editBtn) return;

        if (isEdit) {
            display.classList.add('hidden');
            textarea.classList.remove('hidden');
            footer.classList.remove('hidden');
            footer.classList.add('flex');
            editBtn.classList.add('bg-primary/20', 'text-primary');
            textarea.focus();
            textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        } else {
            display.classList.remove('hidden');
            textarea.classList.add('hidden');
            footer.classList.add('hidden');
            footer.classList.remove('flex');
            editBtn.classList.remove('bg-primary/20', 'text-primary');
        }
    },

    toggleNoteEditMode() {
        if (this.isNoteEditMode) {
            this.saveNote(false); 
        } else {
            this.setNoteEditMode(true);
            const textarea = document.getElementById('note-textarea');
            if (textarea && textarea.value.trim() === '') {
                textarea.value = '• ';
            }
        }
    },

    handleNoteKeydown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const ta = e.target;
            const start = ta.selectionStart;
            const end = ta.selectionEnd;
            const val = ta.value;
            ta.value = val.substring(0, start) + '\n• ' + val.substring(end);
            ta.selectionStart = ta.selectionEnd = start + 3;
        }
    },

    closeNotePanel() {
        const modal = document.getElementById('note-modal');
        if(!modal) return;
        modal.classList.add('opacity-0');
        modal.querySelector('div').classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            this.currentNoteTarget = null;
        }, 200);
    },

    saveNote(close = true) {
        if(!this.currentNoteTarget || !AppState.currentModalAlbum) return;
        const textarea = document.getElementById('note-textarea');
        const display = document.getElementById('note-display');
        
        let rawText = textarea.value;
        let lines = rawText.split('\n');
        let bulleted = lines.map(line => {
            let t = line.trim();
            if (t === '' || t === '•') return null;
            if (!t.startsWith('•')) return '• ' + t;
            return line;
        }).filter(l => l !== null);
        let text = bulleted.join('\n');
        
        const { type, index } = this.currentNoteTarget;
        
        if (type === 'album') {
            AppState.currentModalAlbum.note = text;
            this.updateAlbumNoteIcon();
        } else if (type === 'track' && index !== null) {
            const actualTrackIndex = AppState.currentModalAlbum.tracks.findIndex(t => t.originalIndex === index || t === AppState.currentModalAlbum.tracks[index]);
            if (actualTrackIndex !== -1) {
                AppState.currentModalAlbum.tracks[actualTrackIndex].note = text;
            }
        }
        
        this.updateModalButtons();
        if (type === 'track') this.renderTracklist();
        
        textarea.value = text;
        if(display) display.textContent = text;
        
        // Auto-save the note to Firebase if the album is in your library
        const isSaved = AppState.library.some(a => a.id === AppState.currentModalAlbum.id);
        if (isSaved) {
            const libIdx = AppState.library.findIndex(a => a.id === AppState.currentModalAlbum.id);
            if (libIdx > -1) {
                AppState.library[libIdx] = JSON.parse(JSON.stringify(AppState.currentModalAlbum));
                this.saveAlbumData(AppState.library[libIdx]);
            }
        }

        if (close) {
            this.closeNotePanel();
        } else {
            this.setNoteEditMode(false);
        }
    },
    
    showAllNotes(albumId) {
        const album = AppState.library.find(a => a.id === albumId);
        if (!album) return;

        let html = '';
        let rawTextForCopy = '';

        html += `<div class="flex items-center gap-4 mb-5 pb-4 border-b border-lightBorder dark:border-gray-800">
            <img src="${Utils.escapeHTML(album.customCoverUrl || album.coverUrl)}" onerror="this.src='https://placehold.co/100x100/ebe4dc/594636?text=${t('no_cover').replace(/ /g, '+')}'; this.onerror=null;" class="w-16 h-16 rounded-xl shadow-md object-cover border border-lightBorder dark:border-gray-800 flex-shrink-0">
            <div class="min-w-0">
                <h2 class="text-xl md:text-2xl font-black text-gray-900 dark:text-white italic leading-tight truncate">${Utils.escapeHTML(album.title)}</h2>
                <p class="text-sm md:text-base font-semibold text-gray-500 dark:text-gray-400 truncate mt-0.5">${Utils.escapeHTML(album.artist)}</p>
            </div>
        </div>`;

        rawTextForCopy += `${album.artist.toUpperCase()} - ${album.title.toUpperCase()}\n`;
        rawTextForCopy += `=========================================\n\n`;

        if (album.note && album.note.trim() !== '') {
            html += `<div class="mb-6">
                <div class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-bold mb-3 uppercase tracking-widest shadow-sm">
                    <i class="ph-bold ph-vinyl-record text-base"></i> ${t("album_note")}
                </div>
                <div class="bg-lightBg dark:bg-darker rounded-xl p-5 border border-lightBorder dark:border-gray-800 text-base italic leading-relaxed text-gray-800 dark:text-gray-200 whitespace-pre-wrap shadow-inner font-medium">${Utils.escapeHTML(album.note)}</div>
            </div>`;
            
            rawTextForCopy += `[${t("album_note").toUpperCase()}]\n${album.note.trim()}\n\n`;
        }

        const tracksWithNotes = album.tracks ? album.tracks.filter(t => t.note && t.note.trim() !== '') : [];
        if (tracksWithNotes.length > 0) {
            html += `<div class="space-y-4">
                <div class="flex items-center gap-2 mb-3 pb-2 border-b border-lightBorder/50 dark:border-gray-800/50">
                    <i class="ph-bold ph-music-notes text-gray-400 text-lg"></i>
                    <h3 class="text-sm font-bold text-gray-500 uppercase tracking-widest">${t("track_notes")}</h3>
                </div>`;
            
            rawTextForCopy += `[${t("track_notes").toUpperCase()}]\n`;

            tracksWithNotes.forEach(track => {
                html += `<div class="bg-white dark:bg-surfaceHover rounded-xl p-4 border border-lightBorder dark:border-gray-800 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-primary/40 group-hover:bg-primary transition-colors"></div>
                    <h4 class="font-bold text-gray-900 dark:text-white mb-2 flex items-start gap-2 pl-2">
                        <span class="text-sm text-primary font-black mt-0.5">${track.number}.</span>
                        <span class="italic text-lg leading-snug">${Utils.escapeHTML(track.title)}</span>
                    </h4>
                    <div class="text-base italic leading-relaxed text-gray-600 dark:text-gray-300 whitespace-pre-wrap pl-6 ml-0.5 border-l-2 border-lightBorder/60 dark:border-gray-700/60">${Utils.escapeHTML(track.note)}</div>
                </div>`;

                rawTextForCopy += `${track.number}. ${track.title.toUpperCase()}:\n${track.note.trim()}\n\n`;
            });
            html += `</div>`;
        }

        AppState.currentAllNotesRawText = rawTextForCopy.trim();

        const contentEl = document.getElementById('all-notes-content');
        if (contentEl) {
            contentEl.innerHTML = html;
        }

        const modal = document.getElementById('all-notes-modal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            requestAnimationFrame(() => {
                modal.classList.remove('opacity-0');
                modal.querySelector('div').classList.remove('scale-95');
            });
        }
    },

    closeAllNotesModal() {
        const modal = document.getElementById('all-notes-modal');
        if (!modal) return;
        modal.classList.add('opacity-0');
        modal.querySelector('div').classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 200);
    },

    copyAllNotes() {
        if (!AppState.currentAllNotesRawText) return;
        const text = AppState.currentAllNotesRawText;
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                showToast(t("toast_notes_copied"), "success");
            }).catch(() => this.fallbackCopyText(text));
        } else {
            this.fallbackCopyText(text);
        }
    },

    fallbackCopyText(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            showToast(t("toast_notes_copied"), "success");
        } catch(err) {
            showToast(t("toast_copy_fail"), "error");
        }
        document.body.removeChild(ta);
    },

    updateAlbumNoteIcon() {
        const btn = document.getElementById('album-note-btn');
        if(!btn || !AppState.currentModalAlbum) return;
        const hasNote = !!AppState.currentModalAlbum.note;
        if(hasNote) {
            btn.classList.add('text-primary');
            btn.classList.remove('text-gray-500');
            btn.innerHTML = '<i class="ph-fill ph-paperclip text-lg"></i>';
        } else {
            btn.classList.remove('text-primary');
            btn.classList.add('text-gray-500');
            btn.innerHTML = '<i class="ph-bold ph-paperclip text-lg"></i>';
        }
    },

    toggleModalTrackSort(mode) {
        AppState.modalTrackSort = mode;
        localStorage.setItem('albumDiaryModalTrackSort', mode);
        this.updateModalTrackSortButtons();
        this.renderTracklist();
    },

    updateModalTrackSortButtons() {
        const mode = AppState.modalTrackSort;
        const btnDef = document.getElementById('btn-track-sort-default');
        const btnRat = document.getElementById('btn-track-sort-rating');
        if (btnDef && btnRat) {
            if (mode === 'default') {
                btnDef.className = "px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-semibold text-primary bg-white dark:bg-surfaceHover shadow-sm";
                btnRat.className = "px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-semibold text-gray-500 dark:text-gray-400 hover:text-primary";
            } else {
                btnDef.className = "px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-semibold text-gray-500 dark:text-gray-400 hover:text-primary";
                btnRat.className = "px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-semibold text-primary bg-white dark:bg-surfaceHover shadow-sm";
            }
        }
    },

    getStarColorClass(rating) {
        switch(rating) {
            case 1: return 'text-red-700 dark:text-red-600';      
            case 2: return 'text-orange-700 dark:text-orange-600';    
            case 3: return 'text-amber-600 dark:text-amber-500';     
            case 4: return 'text-green-700 dark:text-green-600';      
            case 5: return 'text-blue-800 dark:text-blue-600';       
            default: return 'text-gray-300 dark:text-gray-600';
        }
    },

    renderTracklist() {
        const con = document.getElementById('modal-tracklist'), al = AppState.currentModalAlbum;
        if(!con || !al) return;
        
        if (!al.tracks || al.tracks.length === 0) { con.innerHTML = `<p class="text-sm text-gray-500 p-4">${t('no_tracks')}</p>`; return; }
        con.innerHTML = ''; 
        const frag = document.createDocumentFragment();

        let tracksWithIndex = al.tracks.map((tr, idx) => ({ ...tr, originalIndex: idx }));

        if (AppState.modalTrackSort === 'rating') {
            tracksWithIndex.sort((a, b) => {
                if (b.rating !== a.rating) {
                    return b.rating - a.rating;
                }
                return parseInt(a.number || 0) - parseInt(b.number || 0);
            });
        }

        tracksWithIndex.forEach((tr) => {
            const i = tr.originalIndex;
            const row = document.createElement('div');
            row.className = 'flex items-center justify-start py-1.5 gap-2 group w-full';

            const starColorClass = tr.rating > 0 ? this.getStarColorClass(tr.rating) : 'text-gray-300 dark:text-gray-600';

            let stars = `<div class="flex items-center star-container flex-shrink-0 bg-lightBg dark:bg-surface border border-lightBorder dark:border-surface shadow-sm rounded-full px-2 h-11">`;
            for(let s=1; s<=5; s++) {
                const isActive = tr.rating >= s;
                const starColor = isActive ? starColorClass : 'text-gray-300 dark:text-gray-600';
                stars += `<button class="star-btn p-0.5 sm:p-1 outline-none transition-transform hover:scale-110 active:scale-90" onclick="app.rateTrack(${i}, ${s})">
                    <i class="ph-fill ph-star ${starColor} text-base sm:text-lg"></i>
                </button>`;
            }
            stars += '</div>';

            let info = this.isEditMode ? 
                `<div class="flex items-center flex-grow min-w-0 bg-lightBg dark:bg-surface border border-lightBorder dark:border-surface shadow-sm rounded-full px-2 h-11">
                    <input type="text" value="${Utils.escapeHTML(tr.number)}" onblur="app.updateTrackField(${i},'number',this.value)" class="w-7 text-xs text-center font-bold bg-white dark:bg-darker border border-lightBorder dark:border-gray-800 rounded-full py-1 flex-shrink-0 outline-none focus:border-primary transition-colors text-gray-800 dark:text-gray-200">
                    <input type="text" value="${Utils.escapeHTML(tr.title)}" onblur="app.updateTrackField(${i},'title',this.value)" class="flex-grow text-xs sm:text-sm font-bold bg-white dark:bg-darker border border-lightBorder dark:border-gray-800 rounded-full px-3 py-1 mx-1.5 min-w-0 outline-none focus:border-primary transition-colors text-gray-800 dark:text-gray-200 italic">
                    <button onclick="app.openNotePanel('track', ${i})" class="p-1.5 rounded-full flex-shrink-0 transition-colors active:scale-90 ${tr.note ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}"><i class="ph-${tr.note ? 'fill' : 'bold'} ph-paperclip text-lg"></i></button>
                    <button onclick="app.deleteTrack(${i})" class="bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full p-1.5 flex-shrink-0 transition-transform active:scale-95 cursor-pointer ml-1"><i class="ph-bold ph-trash"></i></button>
                 </div>` : 
                `<div class="flex items-center flex-grow min-w-0 bg-lightBg dark:bg-surface border border-lightBorder dark:border-surface shadow-sm rounded-full px-4 h-11">
                    <span class="text-gray-400 dark:text-gray-500 text-xs sm:text-sm w-5 text-left font-black flex-shrink-0 mr-1">${tr.number}</span>
                    <span class="text-sm sm:text-base md:text-lg font-bold text-gray-900 dark:text-white truncate min-w-0 flex-grow italic" style="line-height: 1.2;">${Utils.escapeHTML(tr.title)}</span>
                    <button onclick="app.openNotePanel('track', ${i})" class="ml-2 p-1.5 rounded-full transition-colors flex-shrink-0 active:scale-90 ${tr.note ? 'text-primary hover:bg-primary/10' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-lightHighlight dark:hover:bg-darker'}">
                        <i class="ph-${tr.note ? 'fill' : 'bold'} ph-paperclip text-lg"></i>
                    </button>
                 </div>`;
            
            row.innerHTML = `${info}${stars}`;
            frag.appendChild(row);
        });
        
        if (this.isEditMode) {
            const addBtn = document.createElement('button');
            addBtn.className = 'w-full py-2.5 mt-2 border-2 border-dashed border-lightBorder dark:border-gray-800 rounded-xl text-gray-500 font-bold flex items-center justify-center gap-2 hover:bg-lightHighlight dark:hover:bg-surface transition-colors active:scale-[0.98] cursor-pointer';
            addBtn.innerHTML = `<i class="ph-bold ph-plus text-lg"></i> ${t('add_new_track')}`;
            addBtn.onclick = () => this.addNewTrack();
            frag.appendChild(addBtn);
        }

        con.appendChild(frag);
        this.updateModalTrackSortButtons();
    },

    rateTrack(idx, r) { 
        if(!AppState.currentModalAlbum?.tracks?.[idx]) return;
        AppState.currentModalAlbum.tracks[idx].rating = AppState.currentModalAlbum.tracks[idx].rating === r ? 0 : r; 
        this.renderTracklist(); 
        this.calculateAverageScore(); 
        
        const isSaved = AppState.library.some(a => a.id === AppState.currentModalAlbum.id);
        if (isSaved) {
            const libIdx = AppState.library.findIndex(a => a.id === AppState.currentModalAlbum.id);
            if (libIdx > -1) {
                AppState.currentModalAlbum.dateAdded = new Date().toISOString();
                AppState.library[libIdx] = JSON.parse(JSON.stringify(AppState.currentModalAlbum));
                this.saveAlbumData(AppState.library[libIdx]); // Save single album
                this.renderDateAdded();
                if(AppState.currentView === 'library') { this.renderLibrary(); }
                if(AppState.currentView === 'stats') { this.renderStats(); }
            }
        }
        
        this.updateModalButtons(); 
    },
    
    calculateAverageScore() {
        const al = AppState.currentModalAlbum;
        if(!al) return;
        
        const totalTracks = al.tracks ? al.tracks.length : 0;
        const ratedTracks = al.tracks ? al.tracks.filter(t => t.rating > 0) : [];
        
        let runningAvg = "0.0";
        let finalAvg = 0;
        
        if (ratedTracks.length > 0) {
            runningAvg = (ratedTracks.reduce((a,t)=>a+t.rating,0)/ratedTracks.length).toFixed(1);
        }
        
        if (totalTracks > 0 && ratedTracks.length === totalTracks) {
            finalAvg = parseFloat(runningAvg);
        }
        
        const avgEl = document.getElementById('modal-avg-score');
        if(avgEl) avgEl.textContent = runningAvg > 0 ? runningAvg : "-"; 
        al.averageScore = finalAvg;
    },
    
    addNewTrack() { 
        if (!AppState.currentModalAlbum) return;
        if (!AppState.currentModalAlbum.tracks) AppState.currentModalAlbum.tracks = [];
        const tracks = AppState.currentModalAlbum.tracks;
        const newNum = tracks.length > 0 ? (tracks.length + 1).toString() : "1";
        tracks.push({ id: 'manual_' + Date.now(), title: t('add_new_track'), number: newNum, rating: 0 });
        this.renderTracklist();
        this.updateModalButtons();
    }, 
    
    deleteTrack(idx) { 
        if (!AppState.currentModalAlbum || !AppState.currentModalAlbum.tracks) return;
        AppState.currentModalAlbum.tracks.splice(idx, 1);
        this.renderTracklist();
        this.calculateAverageScore();
        this.updateModalButtons();
    },

    updateModalButtons() {
        const con = document.getElementById('modal-save-btn-container'), al = AppState.currentModalAlbum;
        if(!con || !al) return;
        const orig = AppState.library.find(a => a.id === al.id);
        const isMod = orig ? JSON.stringify(orig) !== JSON.stringify(al) : true;

        if(orig) {
            if(isMod) con.innerHTML = `<button onclick="app.saveAlbumToLibrary()" class="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md cursor-pointer hover:scale-105 transition-transform">${t("update")}</button>`;
            else con.innerHTML = `<button onclick="app.removeAlbumFromLibrary('${al.id}')" class="bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-xs font-bold cursor-pointer hover:bg-red-200 transition-colors">${t("remove")}</button>`;
        } else con.innerHTML = `<button onclick="app.saveAlbumToLibrary()" class="bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md cursor-pointer hover:scale-105 transition-transform">${t("add")}</button>`;
    },
    
    saveAlbumToLibrary() {
        if(!AppState.currentModalAlbum) return;
        
        AppState.currentModalAlbum.dateAdded = new Date().toISOString();
        
        const idx = AppState.library.findIndex(a => a.id === AppState.currentModalAlbum.id);
        if (idx > -1) { AppState.library[idx] = AppState.currentModalAlbum; showToast(t("toast_changes_saved"), "success"); } 
        else { AppState.library.unshift(AppState.currentModalAlbum); showToast(t("toast_album_added"), "success"); }
        
        this.saveAlbumData(AppState.currentModalAlbum); 
        this.updateModalButtons(); 
        this.renderDateAdded();
        
        if(AppState.currentView === 'library') { this.renderLibrary(); }
    },
    
    removeAlbumFromLibrary(id) {
        AppState.library = AppState.library.filter(a => a.id !== id); 
        this.deleteAlbumData(id); 
        showToast(t("toast_album_removed"), "info"); 
        this.closeModal();
        if(AppState.currentView === 'library') { this.renderLibrary(); }
    },

    toggleArtistStatsSort(t) { 
        if (AppState.statsArtistSortBy === t) {
            AppState.statsArtistSortDirection = AppState.statsArtistSortDirection === 'desc' ? 'asc' : 'desc';
        } else {
            AppState.statsArtistSortBy = t;
            AppState.statsArtistSortDirection = 'desc';
        }
        localStorage.setItem('albumDiaryStatsSortBy', AppState.statsArtistSortBy);
        localStorage.setItem('albumDiaryStatsSortDirection', AppState.statsArtistSortDirection);
        this.renderStats(); 
    },
    
    renderStats() {
        const lib = AppState.library;
        const setEl = (id, txt) => { const el = document.getElementById(id); if(el) el.textContent = txt; };
        
        setEl('stat-total-albums', lib.length);
        const uniqueArtists = new Set(lib.map(a => a.artist)).size;
        setEl('stat-unique-artists', uniqueArtists);

        const rated = lib.filter(a => a.averageScore > 0);
        const gAvg = rated.length ? (rated.reduce((s,a) => s + a.averageScore, 0) / rated.length).toFixed(1) : "0.0";
        setEl('stat-avg-rating', gAvg);

        // --- CORE LIST DATA ---
        const aStats = {}, gStats = {};
        lib.forEach(a => {
            if(!aStats[a.artist]) aStats[a.artist] = { c:0, s:0, rc:0 };
            aStats[a.artist].c++; if(a.averageScore > 0) { aStats[a.artist].s += a.averageScore; aStats[a.artist].rc++; }
            if(a.genres) a.genres.forEach(g => { const ng = g.trim().toLowerCase(); if(!gStats[ng]) gStats[ng]={n:g.trim(),c:0, raw: g.trim()}; gStats[ng].c++; });
        });

        // --- NEW: ADVANCED CHART DATA CALCULATIONS ---
        
        // 1. Rating Distribution (Count of 1, 2, 3, 4, 5 star tracks)
        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        lib.forEach(a => {
            if(a.tracks) {
                a.tracks.forEach(t => { if(t.rating >= 1 && t.rating <= 5) distribution[Math.round(t.rating)]++; });
            }
        });

        // 2. Decade Breakdown (Average Album Score per Decade)
        const decades = {};
        rated.forEach(a => {
            const year = parseInt(a.year);
            if(!isNaN(year)) {
                const decade = Math.floor(year / 10) * 10;
                if(!decades[decade]) decades[decade] = { sum: 0, count: 0 };
                decades[decade].sum += a.averageScore;
                decades[decade].count++;
            }
        });
        const sortedDecades = Object.keys(decades).sort();
        const decadeLabels = sortedDecades.map(d => `${d}s`);
        const decadeData = sortedDecades.map(d => (decades[d].sum / decades[d].count).toFixed(2));

        // 3. Listening Trends (Average Album Score by Month Added)
        const trends = {};
        rated.forEach(a => {
            if(a.dateAdded) {
                const d = new Date(a.dateAdded);
                if(!isNaN(d.getTime())) {
                    const month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                    if(!trends[month]) trends[month] = { sum: 0, count: 0 };
                    trends[month].sum += a.averageScore;
                    trends[month].count++;
                }
            }
        });
        const sortedMonths = Object.keys(trends).sort();
        const trendData = sortedMonths.map(m => (trends[m].sum / trends[m].count).toFixed(2));

        // --- CHART RENDERING ENGINE ---
        const isDark = document.documentElement.classList.contains('dark');
        const tColor = isDark ? '#d1d5db' : '#374151'; // Text Color
        const gColor = isDark ? '#374151' : '#e5e7eb'; // Grid Color
        
        const buildChart = (canvasId, type, labels, dataPoints, hexColor, forceZero = true) => {
            const ctx = document.getElementById(canvasId);
            if(!ctx) return;
            
            // Destroy existing chart to prevent hover overlapping issues
            if(this.chartInstances[canvasId]) this.chartInstances[canvasId].destroy();
            
            this.chartInstances[canvasId] = new Chart(ctx, {
                type: type,
                data: {
                    labels: labels,
                    datasets: [{
                        data: dataPoints,
                        backgroundColor: type === 'line' ? `${hexColor}20` : hexColor,
                        borderColor: hexColor,
                        borderWidth: 2,
                        fill: type === 'line',
                        tension: 0.4,
                        borderRadius: type === 'bar' ? 4 : 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        x: { ticks: { color: tColor, font: { family: 'Merriweather', size: 10 } }, grid: { display: false } },
                        y: { ticks: { color: tColor, font: { family: 'Merriweather', size: 10 } }, grid: { color: gColor }, beginAtZero: forceZero }
                    }
                }
            });
        };

        // Execute Chart Renders
        buildChart('chart-distribution', 'bar', ['1 ★', '2 ★', '3 ★', '4 ★', '5 ★'], Object.values(distribution), '#d17b38');
        buildChart('chart-decade', 'bar', decadeLabels, decadeData, '#3b82f6', false);
        buildChart('chart-trends', 'line', sortedMonths, trendData, '#22c55e', false);


        // --- EXISTING LIST RENDERING ---
        const tl = document.getElementById('top-albums-list'); 
        if(tl) {
            tl.innerHTML = '';
            [...rated].sort((a,b)=>b.averageScore-a.averageScore).slice(0,5).forEach((al, i) => {
                const el = document.createElement('div'); el.className = 'flex items-center gap-3 p-2 bg-lightBg dark:bg-surface rounded-xl cursor-pointer active:scale-95 transition-transform hover:bg-lightHighlight dark:hover:bg-surfaceHover'; el.onclick = () => this.openAlbumModal(al.id, al.title, al.artist, al.year);
                el.innerHTML = `<span class="font-bold text-gray-400 w-4 text-center">${i+1}</span><img src="${Utils.escapeHTML(al.customCoverUrl || al.coverUrl)}" class="w-10 h-10 rounded shadow-sm object-cover"><div class="flex-1 min-w-0"><p class="text-sm font-bold truncate italic">${Utils.escapeHTML(al.title)}</p><p class="text-[10px] text-gray-500 truncate">${Utils.escapeHTML(al.artist)}</p></div><span class="text-xs font-bold text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 px-2 py-1 rounded-lg">${al.averageScore.toFixed(1)}</span>`;
                tl.appendChild(el);
            });
        }

        ['rating', 'count'].forEach(type => {
            const btn = document.getElementById(`btn-stats-sort-${type}`); 
            const iconDir = document.getElementById(`icon-stats-sort-${type}-dir`);
            if (!btn || !iconDir) return;
            if (AppState.statsArtistSortBy === type) {
                btn.classList.add('text-primary', 'bg-primary/10'); btn.classList.remove('text-gray-500');
                iconDir.className = `ph-bold ph-arrow-${AppState.statsArtistSortDirection === 'desc' ? 'down' : 'up'} text-[10px]`;
                iconDir.classList.remove('hidden');
            } else {
                btn.classList.remove('text-primary', 'bg-primary/10'); btn.classList.add('text-gray-500');
                iconDir.classList.add('hidden');
            }
        });

        const dir = AppState.statsArtistSortDirection === 'desc' ? 1 : -1;
        const alEl = document.getElementById('artist-list'); 
        if(alEl) {
            alEl.innerHTML = '';
            Object.keys(aStats).sort((a,b) => {
                if (AppState.statsArtistSortBy === 'rating') {
                    const avgA = aStats[a].rc ? aStats[a].s/aStats[a].rc : 0;
                    const avgB = aStats[b].rc ? aStats[b].s/aStats[b].rc : 0;
                    return (avgB - avgA) * dir;
                } else {
                    return (aStats[b].c - aStats[a].c) * dir;
                }
            }).slice(0,10).forEach(art => {
                const st = aStats[art], avg = st.rc ? (st.s/st.rc).toFixed(1) : '-';
                const li = document.createElement('li'); li.className = 'p-3 flex justify-between items-center text-sm cursor-pointer hover:bg-lightBg dark:hover:bg-surfaceHover transition-colors active:bg-lightHighlight dark:active:bg-darker';
                li.onclick = () => {
                    app.showView('library');
                    app.setFilter('Group', art);
                    window.scrollTo(0,0);
                    showToast(`${t('toast_filtered_genre')} ${Utils.escapeHTML(art)}`, "info");
                };
                li.innerHTML = `<div><p class="font-bold">${Utils.escapeHTML(art)}</p><p class="text-[10px] text-gray-500">${st.c} ${t('albums')}</p></div><span class="text-yellow-500 font-bold flex items-center gap-1"><i class="ph-fill ph-star"></i> ${avg}</span>`;
                alEl.appendChild(li);
            });
        }

        const glEl = document.getElementById('genre-list'); 
        if(glEl) {
            glEl.innerHTML = '';
            Object.values(gStats).sort((a,b)=>b.c-a.c).slice(0,8).forEach(g => {
                const displayG = tGenre(g.n);
                const li = document.createElement('li'); li.className = 'p-2 bg-lightBg dark:bg-surface rounded-lg flex justify-between items-center text-sm cursor-pointer hover:bg-lightHighlight dark:hover:bg-surfaceHover transition-colors active:scale-95';
                li.onclick = () => {
                    app.showView('library');
                    app.setFilter('Genre', g.raw);
                    window.scrollTo(0,0);
                    showToast(`${t('toast_filtered_genre')} ${Utils.escapeHTML(displayG)}`, "info");
                };
                li.innerHTML = `<span class="font-medium">${Utils.escapeHTML(displayG)}</span><span class="text-xs bg-white dark:bg-darker px-2 py-0.5 rounded-full text-gray-500 font-bold">${g.c}</span>`;
                glEl.appendChild(li);
            });
        }
    }
};

window.app = app;
app.init();