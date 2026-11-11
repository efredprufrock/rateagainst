// 1. Firebase Imports (v10 ESM - Browser CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    signInWithPopup, 
    signInWithRedirect,
    GoogleAuthProvider, 
    signOut, 
    onAuthStateChanged,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    EmailAuthProvider,
    linkWithCredential
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
    getFirestore,
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager,
    getDocsFromCache,
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    deleteDoc,
    query,
    where
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// 2. Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtIzWbtArIE2sY9OuQcdZajc8d3DyslWE",
    authDomain: "rateagainst1.firebaseapp.com",
    projectId: "rateagainst1",
    storageBucket: "rateagainst1.firebasestorage.app",
    messagingSenderId: "535921706800",
    appId: "1:535921706800:web:fb1d7603a7c3782abf2af5"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
// Veriler telefonda da saklanır: uygulama anında açılır, internet yokken de kitaplık görünür
let db;
try { db = initializeFirestore(firebaseApp, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) }); }
catch (e) { db = getFirestore(firebaseApp); }
const googleProvider = new GoogleAuthProvider();
const OWNER_UID = "2i3wrGcLPfMDZNDNGpY4QTYiudb2";

// Add this line to force the account selection screen:
googleProvider.setCustomParameters({ prompt: 'select_account' });

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
        nav_stats: "Summary",
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
        search_itunes: "Find cover",
        choose_cover: "Pick a cover",
        cover_selected: "Cover updated", upload_cover: "Upload from computer", install_app: "Install as app", shelf_title: "MY SHELF · ALL-TIME FAVOURITES", shelf_show: "Show shelf", shelf_hide: "Hide shelf", shelf_hint: "Tap a record to pull it out; tap again to open it.", shelf_empty: "Add your 10 favourite albums with the record button in the album panel.", shelf_add_btn: "Put on my shelf", shelf_remove_btn: "Remove from my shelf", shelf_added: "Added to your shelf", shelf_removed: "Removed from your shelf", shelf_full: "Your shelf is full (10 albums). Remove one first.", loop_title: "ON LOOP", loop_add_btn: "Put on loop", loop_remove_btn: "Take off loop", loop_added: "Now on loop", loop_removed: "Taken off loop", back_to_tracks: "Back to tracks", more_actions: "More actions", install_ios_hint: "To add it as an app, tap Share in Safari, then “Add to Home Screen”.", app_installed: "RateAgainst was added to your home screen", upload_not_image: "This file could not be read as an image",
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
        login_prompt: "View-only mode. Sign in to manage the diary.", rated_on: "Rating finished", loop_best: "Best so far", loop_next: "Up next", toast_not_admin: "This account can only view.",
        sign_in_google: "Sign in with Google", toggle_language: "Change language", toggle_theme: "Change theme", admin_login: "Admin sign-in", change_photo: "Change profile photo", toast_photo_saved: "Profile photo updated.", toast_photo_failed: "Could not upload the photo.", email_sign_in: "Sign in with email", email_placeholder: "Email", password_placeholder: "Password", sign_in: "Sign in", forgot_password: "Forgot password", set_password_hint: "Set a password to sign in with email in the app.", new_password_placeholder: "New password (min. 6 characters)", set_password: "Set password", toast_bad_login: "Wrong email or password.", toast_too_many: "Too many attempts. Try again shortly.", toast_login_failed: "Could not sign in.", toast_enter_email: "Enter your email first.", toast_reset_sent: "If registered, a reset link was sent to your email.", toast_password_set: "Password set. You can now sign in with email too.", toast_relogin: "For security, sign out and back in with Google, then try again.", toast_weak_password: "Password must be at least 6 characters.", toast_password_exists: "This account already has a password.",
        sign_out: "Sign Out",
        nav_queue: "Up Next",
        close: "Close",
        edit: "Edit",
        status_filter: "Listening status",
        listen_status: "Listening status",
        status_all: "All",
        status_planned: "To listen",
        status_listening: "Listening",
        status_done: "Done",
        badge_planned: "UP NEXT",
        badge_listening: "LISTENING",
        now_listening: "NOW LISTENING",
        tracks_rated: "tracks rated",
        so_far_avg: "Average so far",
        albums_count_suffix: "albums",
        sort_recent: "recently updated",
        login_empty_title: "Your diary is waiting",
        login_empty_desc: "Sign in to reach your archive.",
        queue_title: "Up Next",
        queue_random: "Pick one at random",
        queue_hint_title: "Add from search results",
        queue_hint_desc: "Every album in Search has a \"Listen later\" button; one tap drops it here.",
        queue_empty: "Nothing in the queue. Add albums with \"Listen later\" in Search.",
        queue_subtitle: "albums in the queue",
        queue_oldest: "oldest added",
        queue_sort_oldest: "Oldest",
        queue_sort_newest: "Newest",
        start_listening: "Start listening",
        listen_later: "Listen later",
        added_to_queue: "Added to the queue",
        in_queue: "In queue",
        started_listening: "Moved to Listening",
        tags_add: "+ tag",
        tag_prompt: "New tag (e.g. night, road trip):",
        listen_log: "Listening log",
        listened_today: "+ Listened today",
        times: "times",
        no_listens: "No listens logged yet. Each log saves your current average.",
        listen_logged: "Listen logged",
        listen_log_hint: "Shows how your score changes with each listen.",
        delete_listen: "Delete this listen",
        open_review: "Open review",
        back_to_album: "Back to album",
        copy_markdown: "Copy Markdown",
        review_label: "REVIEW",
        nth_listen: "LISTEN",
        review_empty: "No review written yet. Tap \"Edit\" to write it as paragraphs.",
        export_markdown: "Export reviews to Markdown",
        toast_md_none: "No reviews to export yet.",
        summary_title: "Summary",
        prev_period: "Previous period",
        next_period: "Next period",
        year_summary: "Year summary",
        month_summary: "Month summary",
        summary_listened: "You listened to",
        summary_avg: "your average is",
        summary_empty: "No albums logged in this period.",
        summary_albums: "albums",
        summary_track_ratings: "track ratings",
        summary_reviews: "reviews",
        summary_album_of: "Album of the period",
        summary_top_artist: "Most listened artist",
        summary_top_genre: "Top genre",
        fav_tracks_title: "Your Favorite Tracks",
        see_all: "See all →",
        no_fav_tracks: "5-star tracks will appear here.",
        issue_label: "Listening Notes",
        tracks_header: "Tracks",
        quote_placeholder: "Add an album note…",
        decrease_half: "lower by half a point",
        increase_half: "raise by half a point",
        tap_to_rate: "tap to rate",
        scrub_hint: "Drag up/down, scroll, or use the arrow keys · Enter to save",
        save_rating: "Save rating",
        perfect_score: "Perfect score",
        confirm_remove: "Remove this album from your library?",
        tools_filter: "Filter",
        tools_sort: "Sort",
        tools_view: "View size"
    },
    tr: {
        app_title: "RateAgainst",
        nav_library: "Kitaplık",
        nav_search: "Ara",
        nav_stats: "Özet",
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
        search_itunes: "Kapak bul",
        choose_cover: "Bir kapak seç",
        cover_selected: "Kapak değiştirildi", upload_cover: "Bilgisayardan yükle", install_app: "Uygulama olarak yükle", shelf_title: "RAFIM · EN SEVDİKLERİM", shelf_show: "Rafı göster", shelf_hide: "Rafı gizle", shelf_hint: "Bir plağa dokun, raftan çıksın; bir daha dokun, açılsın.", shelf_empty: "En sevdiğin 10 albümü, albüm panelindeki plak düğmesiyle rafına koy.", shelf_add_btn: "Rafıma koy", shelf_remove_btn: "Raftan kaldır", shelf_added: "Rafına eklendi", shelf_removed: "Raftan kaldırıldı", shelf_full: "Rafın dolu (10 albüm). Önce birini kaldır.", loop_title: "LOOP'TA", loop_add_btn: "Loop'a al", loop_remove_btn: "Loop'tan çıkar", loop_added: "Loop'a alındı", loop_removed: "Loop'tan çıkarıldı", back_to_tracks: "Parçalara dön", more_actions: "Diğer işlemler", install_ios_hint: "Uygulama olarak eklemek için Safari'de Paylaş düğmesine, sonra “Ana Ekrana Ekle”ye dokun.", app_installed: "RateAgainst ana ekrana eklendi", upload_not_image: "Bu dosya görsel olarak okunamadı",
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
        login_prompt: "Yalnızca görüntüleme modu. Günlüğü yönetmek için giriş yap.", rated_on: "Puanlama bitti", loop_best: "Şimdilik en iyisi", loop_next: "Sırada", toast_not_admin: "Bu hesap yalnızca görüntüleyebilir.",
        sign_in_google: "Google ile Giriş Yap", toggle_language: "Dili değiştir", toggle_theme: "Temayı değiştir", admin_login: "Yönetici girişi", change_photo: "Profil fotoğrafını değiştir", toast_photo_saved: "Profil fotoğrafı güncellendi.", toast_photo_failed: "Fotoğraf yüklenemedi.", email_sign_in: "E-posta ile giriş", email_placeholder: "E-posta", password_placeholder: "Şifre", sign_in: "Giriş yap", forgot_password: "Şifremi unuttum", set_password_hint: "Uygulamada e-postayla giriş yapabilmek için bir şifre belirle.", new_password_placeholder: "Yeni şifre (en az 6 karakter)", set_password: "Şifre belirle", toast_bad_login: "E-posta ya da şifre hatalı.", toast_too_many: "Çok fazla deneme. Biraz sonra tekrar dene.", toast_login_failed: "Giriş yapılamadı.", toast_enter_email: "Önce e-posta adresini yaz.", toast_reset_sent: "Kayıtlıysa, şifre sıfırlama bağlantısı e-postana gönderildi.", toast_password_set: "Şifre belirlendi. Artık e-postanla da giriş yapabilirsin.", toast_relogin: "Güvenlik için çıkış yapıp Google ile yeniden gir, sonra tekrar dene.", toast_weak_password: "Şifre en az 6 karakter olmalı.", toast_password_exists: "Bu hesabın zaten bir şifresi var.",
        sign_out: "Çıkış Yap",
        nav_queue: "Sırada",
        close: "Kapat",
        edit: "Düzenle",
        status_filter: "Dinleme durumu",
        listen_status: "Dinleme durumu",
        status_all: "Tümü",
        status_planned: "Dinlenecek",
        status_listening: "Dinliyorum",
        status_done: "Bitti",
        badge_planned: "SIRADA",
        badge_listening: "DİNLİYORUM",
        now_listening: "ŞU AN DİNLİYORUM",
        tracks_rated: "parça puanlandı",
        so_far_avg: "Şimdilik ortalama",
        albums_count_suffix: "albüm",
        sort_recent: "son güncellenen",
        login_empty_title: "Günlüğün seni bekliyor",
        login_empty_desc: "Arşivine ulaşmak için giriş yap.",
        queue_title: "Dinlenecekler",
        queue_random: "Rastgele birini seç",
        queue_hint_title: "Arama sonuçlarından ekle",
        queue_hint_desc: "Ara sekmesindeki her albümün yanında \"Sonra dinle\" butonu var; tek dokunuşla buraya düşer.",
        queue_empty: "Sırada albüm yok. Ara sekmesinden \"Sonra dinle\" ile ekleyebilirsin.",
        queue_subtitle: "albüm sırada",
        queue_oldest: "en eskisi eklendi:",
        queue_sort_oldest: "En eski",
        queue_sort_newest: "En yeni",
        start_listening: "Dinlemeye başla",
        listen_later: "Sonra dinle",
        added_to_queue: "Dinleneceklere eklendi",
        in_queue: "Sırada",
        started_listening: "Dinliyorum'a taşındı",
        tags_add: "+ etiket",
        tag_prompt: "Yeni etiket (örn. gece, yolculuk):",
        listen_log: "Dinleme kaydı",
        listened_today: "+ Bugün dinledim",
        times: "kez",
        no_listens: "Henüz kayıt yok. Her kayıt o anki ortalamanı saklar.",
        listen_logged: "Dinleme kaydedildi",
        listen_log_hint: "Her dinleyişte puanının nasıl değiştiğini gösterir.",
        delete_listen: "Bu kaydı sil",
        open_review: "İncelemeyi aç",
        back_to_album: "Albüme dön",
        copy_markdown: "Markdown kopyala",
        review_label: "İNCELEME",
        nth_listen: "DİNLEYİŞ",
        review_empty: "Henüz inceleme yazılmadı. \"Düzenle\"ye dokunup paragraflar halinde yazabilirsin.",
        export_markdown: "İncelemeleri Markdown'a aktar",
        toast_md_none: "Aktarılacak inceleme yok.",
        summary_title: "Özet",
        prev_period: "Önceki dönem",
        next_period: "Sonraki dönem",
        year_summary: "Yıl özeti",
        month_summary: "Ay özeti",
        summary_listened: "Bu dönemde",
        summary_avg: "dinledin, ortalaman",
        summary_empty: "Bu dönemde kayıtlı albüm yok.",
        summary_albums: "albüm",
        summary_track_ratings: "parça puanı",
        summary_reviews: "inceleme",
        summary_album_of: "Dönemin albümü",
        summary_top_artist: "En çok dinlenen sanatçı",
        summary_top_genre: "Baskın tür",
        fav_tracks_title: "Favori Parçaların",
        see_all: "Tümü →",
        no_fav_tracks: "5 yıldız verdiğin parçalar burada görünür.",
        issue_label: "Dinleme Notları",
        tracks_header: "Parçalar",
        quote_placeholder: "Albüm notu ekle…",
        decrease_half: "yarım puan azalt",
        increase_half: "yarım puan artır",
        tap_to_rate: "puanlamak için dokun",
        scrub_hint: "Yukarı/aşağı sürükle, tekerleği çevir ya da ok tuşlarını kullan · Enter ile kaydet",
        save_rating: "Puanı kaydet",
        perfect_score: "Tam puan",
        confirm_remove: "Bu albüm kitaplığından kaldırılsın mı?",
        tools_filter: "Filtrele",
        tools_sort: "Sırala",
        tools_view: "Görünüm boyutu"
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
    queueSort: localStorage.getItem('albumDiaryQueueSort') || 'oldest',
    filterGroup: '', filterGenre: '', filterYear: '', filterLabel: '', filterStatus: '',
    isLoading: true, isLoggedIn: false, isAdmin: false,
    summaryPeriod: 'month', summaryOffset: 0,
    currentAllNotesRawText: ''
};

function t(key) { return Translations[AppState.language][key] || key; }

// Tür adları: "post rock", "Post-Rock", "postrock", "PostRock" aynı tür sayılır ve tek biçimde gösterilir
const Genre = {
    // Karşılaştırma anahtarı: büyük/küçük harf, boşluk, tire, nokta vb. fark etmez
    key(g) {
        const raw = String(g || '').trim();
        const k = raw.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/ı/g, 'i').replace(/&/g, 'n').replace(/[^\p{L}\p{N}]+/gu, '');
        return k || raw.toLowerCase();
    },
    // Görünen ad: kitaplıktaki yazımlar arasından ayraçlı olanı seçer (tire > boşluk > bitişik), kelime başlarını büyütür
    pretty(g) {
        const k = this.key(g);
        const variants = {};
        (AppState.library || []).forEach(a => (a.genres || []).forEach(v => { if (this.key(v) === k) { const t = v.trim(); variants[t] = (variants[t] || 0) + 1; } }));
        const score = v => (/-/.test(v) ? 3 : /\s/.test(v) ? 2 : /[a-z][A-Z]/.test(v) ? 1 : 0);
        const best = Object.keys(variants).sort((a, b) => score(b) - score(a) || variants[b] - variants[a] || a.localeCompare(b))[0] || String(g || '').trim();
        return best
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .split(/(\s+|-)/)
            .map(w => (w && w === w.toLowerCase() ? w.charAt(0).toUpperCase() + w.slice(1) : w))
            .join('')
            .replace(/\s+/g, ' ');
    },
    same(a, b) { return this.key(a) === this.key(b); }
};

function tGenre(genreString) {
    if (!genreString) return '';
    const k = Genre.key(genreString);
    for (let key in GenreTranslations) {
        if (Genre.key(key) === k || Genre.key(GenreTranslations[key].tr) === k) {
            return GenreTranslations[key][AppState.language];
        }
    }
    return Genre.pretty(genreString);
}

const Utils = {
    escapeHTML(str) {
        if (!str) return '';
        return str.toString().replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
    },
    debounce(func, wait) {
        let timeout; return function(...args) { clearTimeout(timeout); timeout = setTimeout(() => func(...args), wait); };
    },
    formatDate(iso, opts = { day: 'numeric', month: 'long', year: 'numeric' }) {
        const d = new Date(iso);
        if (isNaN(d.getTime())) return '-';
        return d.toLocaleDateString(AppState.language === 'en' ? 'en-US' : 'tr-TR', opts);
    },
    todayISO() {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    },
    download(filename, content, type) {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = filename;
        document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    }
};

// --- Albüm yardımcıları: durum, kısmi ortalama, renk kademesi ---
const AlbumUtils = {
    // Loop'ta kartındaki albüm: elle seçilen, yoksa en son dinlenen
    loopPick(list) {
        return list.find(a => a.loopAt) || list
            .filter(a => AlbumUtils.status(a) === 'listening')
            .sort((a, b) => new Date(AlbumUtils.lastActivity(b)) - new Date(AlbumUtils.lastActivity(a)))[0] || null;
    },
    ratedTracks(album) { return (album.tracks || []).filter(tr => tr.rating > 0); },
    // Puanlanmış parçaların ortalaması (tüm parçalar puanlanmasa da)
    runningAvg(album) {
        const rated = this.ratedTracks(album);
        if (!rated.length) return 0;
        return Math.round((rated.reduce((s, tr) => s + tr.rating, 0) / rated.length) * 10) / 10;
    },
    progress(album) {
        const total = (album.tracks || []).length;
        const rated = this.ratedTracks(album).length;
        return { total, rated, pct: total ? Math.round((rated / total) * 100) : 0 };
    },
    // Eski kayıtlarda durum alanı yoksa puanlamadan tahmin et
    status(album) {
        if (album.status) return album.status;
        if (album.averageScore > 0) return 'done';
        return this.ratedTracks(album).length > 0 ? 'listening' : 'done';
    },
    lastActivity(album) { return album.sortAt || album.updatedAt || album.dateAdded || 0; },
    // Tek bir renk sistemi: kartlar, rozetler ve özet aynı eşikleri kullanır
    tier(score) {
        // Puan renkleri: 5.0 lacivert → 0.5 koyu bordo (ortalamalar en yakın yarım puana yuvarlanır)
        const P = {
            5:   ['#1e3a8a', '#8ba3f5'], // lacivert
            4.5: ['#047857', '#34d399'], // koyu yeşil (canlı)
            4:   ['#4f8a5b', '#86c99a'], // yeşil (sakin)
            3.5: ['#4d7c0f', '#a8d64a'], // sarımsı yeşil
            3:   ['#b58105', '#f2c94c'], // sarı
            2.5: ['#d97706', '#f5a623'], // turuncumsu sarı
            2:   ['#ea580c', '#fb8a4c'], // turuncu
            1.5: ['#dc2626', '#f26b6b'], // kırmızı
            1:   ['#9f1239', '#e0607e'], // bordo
            0.5: ['#6b0f1f', '#c0445e']  // koyu bordo
        };
        if (!(score > 0)) return { text: 'text-gray-600 dark:text-gray-400', badge: 'bg-lightHighlight text-gray-700 dark:bg-surfaceHover dark:text-gray-300' };
        const [l, d] = P[Math.min(5, Math.max(0.5, Math.round(score * 2) / 2))];
        return { text: `text-[${l}] dark:text-[${d}]`, badge: `bg-[${l}]/10 text-[${l}] dark:bg-[${d}]/15 dark:text-[${d}]` };
    },
        // Not metnini (madde imli) paragraflara çevir
    noteParagraphs(note) {
        return (note || '').split('\n').map(l => l.replace(/^\s*•\s?/, '').trim()).filter(Boolean);
    },
};

// --- Kapak yardımcıları: kaynak seçimi ve kapak açılmazsa yedek zinciri ---
Object.assign(AlbumUtils, {
    // Yerel yedek görsel (dış siteye bağlı değil, her yerde açılır)
    NO_COVER: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%23ebe4dc'/><circle cx='50' cy='50' r='27' fill='none' stroke='%23c9b8a6' stroke-width='3'/><circle cx='50' cy='50' r='6' fill='%23c9b8a6'/></svg>",
    coverSrc(al) { if (al && !al.coverData && al.coverMissing && al.coverMissing === CoverCache.source(al)) return this.NO_COVER;
        return (al && (al.customCoverUrl || al.coverUrl)) || (al && CoverCache.isFresh(al) ? al.coverData : '') || this.NO_COVER;
    },
    // <img> için src + yedek zinciri: orijinal → kayıtlı kopya → görsel vekili → yerel yedek
    coverAttrs(al) {
        return `src="${Utils.escapeHTML(this.coverSrc(al))}" data-cover-id="${Utils.escapeHTML(al?.id || '')}" onerror="app.coverFallback(this)"`;
    }
});

// --- Ağ yardımcıları: zaman aşımı, MusicBrainz hız sınırı, Deezer (JSONP), iTunes (son yedek) ---
const Net = {
    _mbNext: 0,
    async fetch(url, timeout = 12000) {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), timeout);
        try { return await fetch(url, { signal: ctrl.signal }); }
        finally { clearTimeout(timer); }
    },
    async json(url, timeout) {
        const res = await this.fetch(url, timeout);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    },
    // MusicBrainz saniyede 1 isteğe izin verir: istekleri sıraya koy
    async mb(path) {
        const now = Date.now();
        const wait = Math.max(0, this._mbNext - now);
        this._mbNext = now + wait + 1100;
        if (wait) await new Promise(r => setTimeout(r, wait));
        return this.json(`https://musicbrainz.org/ws/2/${path}${path.includes('?') ? '&' : '?'}fmt=json`);
    },
    // Deezer tarayıcıdan doğrudan çağrılamaz (CORS), JSONP ile okunur
    jsonp(url, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const cb = `__ra_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
            const script = document.createElement('script');
            const done = (fn, val) => { clearTimeout(timer); delete window[cb]; script.remove(); fn(val); };
            const timer = setTimeout(() => done(reject, new Error('timeout')), timeout);
            window[cb] = (data) => done(resolve, data);
            script.onerror = () => done(reject, new Error('jsonp'));
            script.src = `${url}${url.includes('?') ? '&' : '?'}output=jsonp&callback=${cb}`;
            document.head.appendChild(script);
        });
    },
    async deezer(path) {
        const data = await this.jsonp(`https://api.deezer.com/${path}`);
        if (data && data.error) throw new Error(data.error.message || 'deezer');
        return data;
    },
    async itunes(term) {
        const data = await this.json(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=album&limit=5`, 6000);
        return data.results || [];
    },
    // Bir görselin bu ağda açılıp açılmadığını dener
    imageOk(url, timeout = 8000) {
        return new Promise(resolve => {
            const img = new Image();
            const timer = setTimeout(() => { img.src = ''; resolve(false); }, timeout);
            img.onload = () => { clearTimeout(timer); resolve(img.naturalWidth > 1); };
            img.onerror = () => { clearTimeout(timer); resolve(false); };
            img.src = url;
        });
    }
};

// --- Müzik verisi: MusicBrainz (ana kaynak) + Deezer (kapak, eksik albümler, parça süreleri) ---
const MusicSource = {
    isMbid(id) { return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(String(id)); },
    // Karşılaştırma için sadeleştir: "In Rainbows (Deluxe Edition)" → "in rainbows"
    norm(s) {
        return String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '')
            .replace(/\s*[\(\[][^\)\]]*[\)\]]/g, '')
            .replace(/\s+-\s+.*(remaster|deluxe|edition|version|anniversary).*$/i, '')
            .replace(/&/g, 'and').replace(/[^a-z0-9ğüşöçı]+/g, ' ').trim();
    },
    cap(s) { return String(s).replace(/(^|[\s-])(\p{L})/gu, (m, p, c) => p + c.toLocaleUpperCase()); },
    lucene(s) { return String(s).replace(/([+\-&|!(){}\[\]^"~*?:\\/])/g, '\\$1'); },
    pickGenres(list, min = 1) {
        return (list || []).filter(g => (g.count || 0) >= min).sort((a, b) => b.count - a.count).slice(0, 3).map(g => this.cap(g.name));
    },
    creditName(credit) { return (credit || []).map(c => (c.name || c.artist?.name || '') + (c.joinphrase || '')).join('').trim(); },

    fromMB(rg, fallbackArtist) {
        return {
            id: rg.id, source: 'mb',
            title: rg.title,
            artist: this.creditName(rg['artist-credit']) || fallbackArtist || '',
            year: (rg['first-release-date'] || '').slice(0, 4),
            type: rg['primary-type'] === 'EP' ? 'EP' : 'Album',
            cover: `https://coverartarchive.org/release-group/${rg.id}/front-250`,
            coverBig: `https://coverartarchive.org/release-group/${rg.id}/front-500`
        };
    },
    fromDeezer(al, fallbackArtist) {
        return {
            id: `dz_${al.id}`, source: 'deezer', deezerId: String(al.id),
            title: al.title,
            artist: al.artist?.name || fallbackArtist || '',
            year: (al.release_date || '').slice(0, 4),
            type: al.record_type === 'ep' ? 'EP' : 'Album',
            cover: al.cover_medium || al.cover_big || '',
            coverBig: al.cover_xl || al.cover_big || ''
        };
    },
    dzIsAlbum(al) { return !al.record_type || al.record_type === 'album' || al.record_type === 'ep'; },
    mbIsAlbum(rg) {
        return (rg['primary-type'] === 'Album' || rg['primary-type'] === 'EP') && (!rg['secondary-types'] || rg['secondary-types'].length === 0);
    },

    // MusicBrainz listesine Deezer'ı ekle: aynı albümse Deezer kapağını kullan, yoksa yeni sonuç olarak ekle
    merge(mbItems, dzItems, byTitleOnly = false) {
        const key = (it) => byTitleOnly ? this.norm(it.title) : `${this.norm(it.artist)}|${this.norm(it.title)}`;
        const map = new Map();
        const out = [];
        mbItems.forEach(it => { const k = key(it); if (!map.has(k)) { map.set(k, it); out.push(it); } });
        dzItems.forEach(dz => {
            const k = key(dz);
            const hit = map.get(k);
            if (hit) {
                if (hit.source === 'mb' && !hit.deezerId) {
                    hit.deezerId = dz.deezerId;
                    if (dz.cover) { hit.cover = dz.cover; hit.coverBig = dz.coverBig; }
                    if (!hit.year && dz.year) hit.year = dz.year;
                }
            } else { map.set(k, dz); out.push(dz); }
        });
        return out;
    },

    async searchAlbums(q) {
        const [mb, dz] = await Promise.allSettled([
            Net.mb(`release-group/?query=${encodeURIComponent(`${this.lucene(q)} AND (primarytype:album OR primarytype:ep)`)}&limit=50`),
            Net.deezer(`search/album?q=${encodeURIComponent(q)}&limit=40`)
        ]);
        if (mb.status === 'rejected' && dz.status === 'rejected') throw new Error('search');
        const mbItems = mb.status === 'fulfilled' ? (mb.value['release-groups'] || []).filter(rg => this.mbIsAlbum(rg)).slice(0, 25).map(rg => this.fromMB(rg)) : [];
        const dzItems = dz.status === 'fulfilled' ? (dz.value.data || []).filter(al => this.dzIsAlbum(al)).map(al => this.fromDeezer(al)) : [];
        return this.merge(mbItems, dzItems).slice(0, 40);
    },

    bestArtist(list, q, nameOf) {
        const nq = this.norm(q);
        return (list || []).find(a => this.norm(nameOf(a)) === nq) || (list || [])[0] || null;
    },

    async searchArtist(q) {
        const [mbA, dzA] = await Promise.allSettled([
            Net.mb(`artist/?query=${encodeURIComponent(this.lucene(q))}&limit=5`),
            Net.deezer(`search/artist?q=${encodeURIComponent(q)}&limit=5`)
        ]);
        const mbArtist = mbA.status === 'fulfilled' ? this.bestArtist(mbA.value.artists, q, a => a.name) : null;
        let dzArtist = dzA.status === 'fulfilled' ? this.bestArtist(dzA.value.data, mbArtist?.name || q, a => a.name) : null;
        // Deezer başka bir sanatçı bulduysa (isim tutmuyorsa) kullanma
        if (mbArtist && dzArtist && this.norm(dzArtist.name) !== this.norm(mbArtist.name)) dzArtist = null;
        if (!mbArtist && !dzArtist) return { name: null, albums: [] };
        const name = mbArtist?.name || dzArtist.name;

        const [mbR, dzR] = await Promise.allSettled([
            mbArtist ? Net.mb(`release-group?artist=${mbArtist.id}&type=album|ep&limit=100`) : Promise.reject(),
            dzArtist ? Net.deezer(`artist/${dzArtist.id}/albums?limit=200`) : Promise.reject()
        ]);
        const mbItems = mbR.status === 'fulfilled' ? (mbR.value['release-groups'] || []).filter(rg => this.mbIsAlbum(rg)).map(rg => this.fromMB(rg, name)) : [];
        const dzItems = dzR.status === 'fulfilled' ? (dzR.value.data || []).filter(al => this.dzIsAlbum(al)).map(al => this.fromDeezer(al, name)) : [];
        const albums = this.merge(mbItems, dzItems, true)
            .sort((a, b) => (b.year || '0000').localeCompare(a.year || '0000'));
        return { name, albums };
    },

    // Deezer'da aynı albümü bul (kapak ve eksik bilgiler için)
    async dzMatch(artist, title) {
        const na = this.norm(artist), nt = this.norm(title);
        const pick = (list) => (list || []).find(al => this.norm(al.title) === nt && this.norm(al.artist?.name) === na)
            || (list || []).find(al => this.norm(al.title) === nt && (this.norm(al.artist?.name).includes(na) || na.includes(this.norm(al.artist?.name))));
        let res = await Net.deezer(`search/album?q=${encodeURIComponent(`artist:"${artist}" album:"${title}"`)}&limit=10`);
        let hit = pick(res.data);
        if (!hit) { res = await Net.deezer(`search/album?q=${encodeURIComponent(`${artist} ${title}`)}&limit=15`); hit = pick(res.data); }
        return hit || null;
    },

    async dzDetails(dzId) {
        const al = await Net.deezer(`album/${dzId}`);
        let tracks = al.tracks?.data || [];
        if ((al.nb_tracks || 0) > tracks.length) {
            try { const more = await Net.deezer(`album/${dzId}/tracks?limit=300`); if (more.data?.length) tracks = more.data; } catch (e) {}
        }
        return {
            source: 'deezer', deezerId: String(dzId),
            title: al.title || '', artist: al.artist?.name || '',
            year: (al.release_date || '').slice(0, 4),
            label: al.label || '',
            genres: (al.genres?.data || []).map(g => g.name).slice(0, 3),
            cover: al.cover_xl || al.cover_big || '',
            tracks: tracks.map((tr, i) => ({ id: String(tr.id), title: tr.title, number: String(i + 1), rating: 0, ...(tr.duration > 0 ? { duration: tr.duration } : {}) }))
        };
    },

    async mbDetails(id) {
        const [rg, rels] = await Promise.all([
            Net.mb(`release-group/${id}?inc=genres+tags+artist-credits`).catch(() => null),
            Net.mb(`release?release-group=${id}&inc=recordings+labels+genres+media&limit=25`)
        ]);
        const all = rels.releases || [];
        const official = all.filter(r => r.status === 'Official');
        const pool = (official.length ? official : all).filter(r => r.media?.some(m => m.tracks?.length));
        // Standart baskıyı seç: en çok rastlanan parça sayısı, onların içinden en eski tarih
        const count = r => r.media.reduce((s, m) => s + (m.tracks?.length || 0), 0);
        const freq = {};
        pool.forEach(r => { const c = count(r); freq[c] = (freq[c] || 0) + 1; });
        const common = Number(Object.keys(freq).sort((a, b) => freq[b] - freq[a] || a - b)[0]);
        const rel = pool.filter(r => count(r) === common).sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'))[0] || all[0];

        let n = 1;
        const tracks = (rel?.media || []).flatMap(m => (m.tracks || []).map(tr => {
            const ms = tr.length || tr.recording?.length || 0;
            return { id: tr.id, title: tr.title || tr.recording?.title || '', number: String(n++), rating: 0, ...(ms > 0 ? { duration: Math.round(ms / 1000) } : {}) };
        }));
        let genres = this.pickGenres(rg?.genres);
        if (!genres.length) genres = this.pickGenres(rel?.genres);
        if (!genres.length) genres = this.pickGenres(rg?.tags, 2);
        const li = rel?.['label-info'] || [];
        return {
            source: 'mb',
            title: rg?.title || rel?.title || '',
            artist: this.creditName(rg?.['artist-credit'] || rel?.['artist-credit']),
            year: (rg?.['first-release-date'] || rel?.date || '').slice(0, 4),
            label: li.length ? (li[0].label?.name || t('independent')) : '',
            genres, tracks, cover: ''
        };
    },

    // Albümün tüm bilgisi: MusicBrainz + Deezer birleşik
    async details(id, hint = {}) {
        if (String(id).startsWith('dz_')) return this.dzDetails(String(id).slice(3));
        let out;
        try { out = await this.mbDetails(id); }
        catch (e) { out = { source: 'mb', title: hint.title || '', artist: hint.artist || '', year: '', label: '', genres: [], tracks: [], cover: '' }; }
        let dzId = hint.deezerId;
        if (!dzId) {
            try { dzId = (await this.dzMatch(out.artist || hint.artist, out.title || hint.title))?.id; } catch (e) {}
        }
        if (dzId) {
            try {
                const dz = await this.dzDetails(dzId);
                out.deezerId = String(dzId);
                if (dz.cover) out.cover = dz.cover;
                if (!out.tracks.length) out.tracks = dz.tracks;
                else if (dz.tracks.length === out.tracks.length) {
                    // MusicBrainz'de süre yoksa Deezer'dan al
                    out.tracks.forEach((tr, i) => { if (!tr.duration && dz.tracks[i].duration) tr.duration = dz.tracks[i].duration; });
                }
                if (!out.genres.length) out.genres = dz.genres;
                if (!out.label) out.label = dz.label;
                if (!out.year) out.year = dz.year;
            } catch (e) {}
        }
        return out;
    }
};

// --- Kapak kopyası: her albümün küçük bir kopyası Firestore'a kaydedilir, kapak sitesi engelli olsa da görünür ---
const CoverCache = {
    SIZE: 320,
    failed: new Set(),
    pending: new Map(),
    source(al) { return (al && (al.customCoverUrl || al.coverUrl)) || ''; },
    isFresh(al) { return !!(al && al.coverData && al.coverDataSrc === this.source(al)); },
    // Görsel vekili: kapak sitesi bu ağda engelliyse görseli başka bir sunucu üzerinden getirir
    proxy(url, size = 600) {
        return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=${size}&h=${size}&fit=cover&output=jpg&q=85`;
    },
    async toDataURL(blob) {
        const bmp = await createImageBitmap(blob);
        const S = this.SIZE, side = Math.min(bmp.width, bmp.height);
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = S;
        canvas.getContext('2d').drawImage(bmp, (bmp.width - side) / 2, (bmp.height - side) / 2, side, side, 0, 0, S, S);
        bmp.close?.();
        return canvas.toDataURL('image/jpeg', 0.8);
    },
        async make(url) {
        let host = '';
        try { host = new URL(url).hostname; } catch (e) {}
        // Cover Art Archive (archive.org) dosyaları tarayıcıdan doğrudan okunamıyor (CORS): doğrudan görsel vekiliyle al
        const direct = !/(^|\.)(coverartarchive|archive)\.org$/.test(host);
        const proxied = this.proxy(url, this.SIZE * 2);
        let missing = false;
        for (const src of direct ? [url, proxied] : [proxied]) {
            try {
                const res = await Net.fetch(src, 12000);
                if (src === proxied && res.status === 404) missing = true; // kapak hiç yok
                if (!res.ok) continue;
                const blob = await res.blob();
                if (!blob.type.startsWith('image/')) continue;
                return { data: await this.toDataURL(blob) };
            } catch (e) {}
        }
        return { missing };
    },
    // Kopya yoksa ya da kapak değiştiyse yeni kopya üretir: true = kopya kaydedildi, 'missing' = bu adreste kapak yok
    async ensure(al) {
        const src = this.source(al);
        if (!src || src.startsWith('data:') || this.isFresh(al) || al.coverMissing === src) return false;
        const key = `${al.id}|${src}`;
        if (this.failed.has(key)) return false;
        let job = this.pending.get(key);
        if (!job) { job = this.make(src); this.pending.set(key, job); job.finally(() => this.pending.delete(key)); }
        const out = await job;
        if (!out.data) {
            this.failed.add(key);
            if (!out.missing) return false;
            al.coverMissing = src;
            return 'missing';
        }
        al.coverData = out.data;
        al.coverDataSrc = src;
        delete al.coverMissing;
        return true;
    }
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
        this.setupAppMode();
         

        // Firebase Auth Listener
        onAuthStateChanged(auth, async (user) => {
            const loggedOutView = document.getElementById('auth-logged-out');
            const loggedInView = document.getElementById('auth-logged-in');
            const avatarImg = document.getElementById('user-avatar');
            const nameEl = document.getElementById('user-name');
            const emailEl = document.getElementById('user-email');
            const headerAvatarContainer = document.getElementById('header-user-avatar-container');

            if (user && user.uid !== OWNER_UID) {
                showToast(t('toast_not_admin'), "error");
                await signOut(auth);
                return;
            }
            // Yönetici: her şeye erişir · Ziyaretçi (giriş yok): kitaplığı yalnızca görüntüler
            AppState.isAdmin = !!user;
            document.documentElement.classList.toggle('is-visitor', !user);
            document.documentElement.classList.toggle('is-admin', !!user);
            if (user) {
                AppState.isLoggedIn = true;
                AppState.isLoading = true;
                this.renderLibrary(); // iskelet kartlar

                if(loggedOutView) loggedOutView.classList.add('hidden');
                if(loggedInView) {
                    loggedInView.classList.remove('hidden');
                    loggedInView.classList.add('flex');
                }

            if(nameEl) nameEl.textContent = user.displayName || user.email?.split('@')[0] || 'User';
                if(emailEl) emailEl.textContent = user.email || '';
                this.updatePasswordForm();
                // Profil fotoğrafı: önce Google fotoğrafı ya da baş harf, sonra kayıtlı fotoğraf
                this.setAvatar(user.photoURL);
                this.loadAvatar();
                this.toggleLoginModal(false);

                this.loadData();
            } else {
                // Ziyaretçi: yöneticinin kitaplığı salt okunur olarak yüklenir
                AppState.isLoggedIn = true;
                AppState.isLoading = true;
                AppState.library = [];
                if (AppState.currentView === 'search') this.showView('library');
                this.renderLibrary();
                this.loadData();

                if(loggedOutView) loggedOutView.classList.remove('hidden');
                if(loggedInView) {
                    loggedInView.classList.add('hidden');
                    loggedInView.classList.remove('flex');
                }
                
                if(headerAvatarContainer) {
                    // Ziyaretçi sağ üstte yöneticinin profil fotoğrafını görür (dokununca yönetici girişi açılır)
                    this.setAvatar(null);
                    this.loadAvatar();
                }
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            const isOpen = id => !document.getElementById(id)?.classList.contains('hidden');
            if (isOpen('all-notes-modal')) return this.closeAllNotesModal();
            if (isOpen('note-modal')) return this.closeNotePanel();
            if (isOpen('review-view')) return this.closeReview();
            if (isOpen('genre-selection-modal')) return this.closeGenreModal();
            if (isOpen('album-modal')) return this.closeModal();
            this.closeToolGroups();
            this.closeDropdown();
            this.toggleSidebar(false);
        });

        document.addEventListener('click', (e) => {
            const dd = document.getElementById('custom-dropdown');
            if (!e.target.closest('.tool-group') && !e.target.closest('#custom-dropdown')) this.closeToolGroups();
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
        
        ['library', 'queue', 'search', 'stats'].forEach(v => {
            const btn = document.getElementById(`nav-${v}`);
            const icon = document.getElementById(`nav-icon-${v}`);
            const inactive = ['text-gray-600', 'dark:text-gray-400', 'hover:bg-lightHighlight', 'dark:hover:bg-gray-800'];
            if (v === viewName) {
                btn?.classList.add('text-[#a85a1a]', 'dark:text-primary', 'bg-primary/15');
                btn?.classList.remove(...inactive);
                btn?.setAttribute('aria-current', 'page');
                icon?.classList.add('ph-fill');
                icon?.classList.remove('ph');
            } else {
                btn?.classList.remove('text-[#a85a1a]', 'dark:text-primary', 'bg-primary/15');
                btn?.classList.add(...inactive);
                btn?.removeAttribute('aria-current');
                icon?.classList.remove('ph-fill');
                icon?.classList.add('ph');
            }
        });

        document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));
        
        const currentViewEl = document.getElementById(`view-${viewName}`);
        if(currentViewEl) currentViewEl.classList.remove('hidden');
        
        AppState.currentView = viewName;

        if (viewName === 'library') this.renderLibrary();
        else if (viewName === 'queue') this.renderQueue();
        else if (viewName === 'stats') this.renderStats();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    },


    toggleLanguage() {
        AppState.language = AppState.language === 'en' ? 'tr' : 'en';
        localStorage.setItem('albumDiaryLang', AppState.language);
        this.updateLanguageUI();
        this.updateSearchPlaceholder();
         
        
        if (AppState.currentModalAlbum && !document.getElementById('album-modal').classList.contains('hidden')) {
            this.updateModalUI();
        }
        
        if (AppState.currentView === 'library') this.renderLibrary();
        else if (AppState.currentView === 'queue') this.renderQueue();
        else if (AppState.currentView === 'stats') this.renderStats();
        if (!document.getElementById('review-view')?.classList.contains('hidden')) this.renderReview();
    },

    updateLanguageUI() {
        const langIcon = document.getElementById('lang-icon');
        if (langIcon) langIcon.textContent = AppState.language === 'en' ? 'TR' : 'EN';
        const langHead = document.getElementById('lang-icon-head');
        if (langHead) langHead.textContent = AppState.language === 'en' ? 'TR' : 'EN';
        document.documentElement.lang = AppState.language;
        document.querySelectorAll('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
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
        const dark = document.documentElement.classList.contains('dark');
        const icon = document.getElementById('theme-icon');
        if (icon) icon.className = dark ? 'ph-fill ph-moon text-lg px-1 text-yellow-400' : 'ph-fill ph-sun text-lg px-1 text-amber-500';
        const head = document.getElementById('theme-icon-head');
        if (head) head.className = dark ? 'ph-fill ph-moon text-base text-yellow-400' : 'ph-fill ph-sun text-base text-amber-500';
    },

    // --- Telefonda uygulama: kurulum, geri tuşu, arka plandan dönünce yenileme ---
    setupAppMode() {
        const standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
        document.documentElement.classList.toggle('is-standalone', standalone);

        if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
            navigator.serviceWorker.register('sw.js').catch(() => {});
        }

        // Ana ekrana ekle (Android / masaüstü Chrome, Edge)
        const btn = document.getElementById('install-app-btn');
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this._installPrompt = e;
            btn?.classList.remove('hidden'); btn?.classList.add('flex');
        });
        window.addEventListener('appinstalled', () => {
            this._installPrompt = null;
            btn?.classList.add('hidden'); btn?.classList.remove('flex');
            showToast(t('app_installed'), 'success');
        });
        // iPhone / iPad: Safari'de elle eklenir, nasıl yapılacağını göster
        const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        if (ios && !standalone) document.getElementById('install-ios-hint')?.classList.remove('hidden');

        // Telefonun geri tuşu / geri hareketi albüm panelini kapatsın, uygulamadan çıkmasın
        window.addEventListener('popstate', () => {
            if (this._skipPop) { this._skipPop = false; return; }
            const modal = document.getElementById('album-modal');
            if (modal && !modal.classList.contains('hidden')) this.closeModal(true);
        });

        // Uygulama uzun süre arka planda kaldıysa dönünce kitaplığı yenile
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState !== 'visible' || !auth.currentUser) return;
            const modalOpen = !document.getElementById('album-modal')?.classList.contains('hidden');
            if (!modalOpen && Date.now() - (this._lastLoad || 0) > 10 * 60 * 1000) this.loadData();
        });

        // Kısayollar: ./?view=search gibi
        const v = new URLSearchParams(location.search).get('view');
        if (['queue', 'search', 'stats'].includes(v)) this.showView(v);
    },

    async installApp() {
        const p = this._installPrompt;
        if (!p) return;
        p.prompt();
        try { await p.userChoice; } catch (e) {}
        this._installPrompt = null;
        const btn = document.getElementById('install-app-btn');
        btn?.classList.add('hidden'); btn?.classList.remove('flex');
    },

    async signIn() {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            // Ana ekrandan açılan uygulamada açılır pencere engellenirse sayfa yönlendirmesiyle dene
            if (['auth/popup-blocked', 'auth/operation-not-supported-in-this-environment', 'auth/web-storage-unsupported'].includes(error.code)) {
                try { await signInWithRedirect(auth, googleProvider); return; } catch (e) {}
            }
            console.error("Giriş hatası:", error.message);
            showToast("Giriş yapılamadı.", "error");
        }
    },

    // E-posta ile giriş: uygulama olarak kullanırken Google penceresi açılamazsa
    async signInEmail(e) {
        e.preventDefault();
        const email = document.getElementById('login-email')?.value.trim();
        const pass = document.getElementById('login-password')?.value;
        if (!email || !pass) return;
        try {
            await signInWithEmailAndPassword(auth, email, pass);
            document.getElementById('login-password').value = '';
            this.toggleSidebar(false);
        } catch (err) {
            console.error('E-posta girişi:', err.code);
            const bad = ['auth/invalid-credential', 'auth/wrong-password', 'auth/user-not-found', 'auth/invalid-email', 'auth/invalid-login-credentials'];
            showToast(t(bad.includes(err.code) ? 'toast_bad_login' : (err.code === 'auth/too-many-requests' ? 'toast_too_many' : 'toast_login_failed')), 'error');
        }
    },

    async resetPassword() {
        const input = document.getElementById('login-email');
        const email = input?.value.trim();
        if (!email) { showToast(t('toast_enter_email'), 'info'); input?.focus(); return; }
        try { await sendPasswordResetEmail(auth, email); } catch (e) { console.error('Şifre sıfırlama:', e.code); }
        showToast(t('toast_reset_sent'), 'success');
    },

    // Google ile girişliyken şifre belirle: e-posta/şifre aynı hesaba bağlanır (kimlik değişmez)
    async setEmailPassword(e) {
        e.preventDefault();
        const user = auth.currentUser;
        const input = document.getElementById('new-password');
        if (!user?.email || !input?.value) return;
        try {
            await linkWithCredential(user, EmailAuthProvider.credential(user.email, input.value));
            input.value = '';
            this.updatePasswordForm();
            showToast(t('toast_password_set'), 'success');
        } catch (err) {
            console.error('Şifre belirleme:', err.code);
            const msg = { 'auth/requires-recent-login': 'toast_relogin', 'auth/weak-password': 'toast_weak_password', 'auth/provider-already-linked': 'toast_password_exists', 'auth/credential-already-in-use': 'toast_password_exists', 'auth/email-already-in-use': 'toast_password_exists' }[err.code] || 'toast_login_failed';
            showToast(t(msg), 'error');
        }
    },

    updatePasswordForm() {
        const form = document.getElementById('set-password-form');
        const user = auth.currentUser;
        const hasPassword = !!user?.providerData?.some(p => p.providerId === 'password');
        form?.classList.toggle('hidden', !user || hasPassword);
        form?.classList.toggle('flex', !!user && !hasPassword);
    },

    // --- Profil fotoğrafı (Firestore'da küçük bir kopya; her cihazda aynı görünür) ---
    avatarFallback() {
        const u = auth.currentUser;
        const letter = (u?.displayName || u?.email || 'R').trim().charAt(0).toLocaleUpperCase('tr-TR');
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#d17b38"/><text x="50" y="50" dy=".35em" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="48" fill="#140e0a">${letter.replace(/[<&>"]/g, '')}</text></svg>`;
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    },

    setAvatar(src) {
        const fallback = this.avatarFallback();
        const url = src || fallback;
        const img = document.getElementById('user-avatar');
        if (img) { img.onerror = () => { img.onerror = null; img.src = fallback; }; img.src = url; }
        const head = document.getElementById('header-user-avatar-container');
        if (head) {
            head.innerHTML = '';
            const hi = document.createElement('img');
            hi.alt = ''; hi.className = 'w-full h-full object-cover';
            hi.onerror = () => { hi.onerror = null; hi.src = fallback; };
            hi.src = url;
            head.appendChild(hi);
        }
    },

    async loadAvatar() {
        // Yönetici kendi fotoğrafını, ziyaretçi yöneticinin fotoğrafını görür
        const uid = auth.currentUser?.uid || OWNER_UID;
        try {
            const snap = await getDoc(doc(db, 'kitaplik', `${uid}__profile`));
            const photo = snap.exists() ? snap.data()?.profile?.photo : '';
            if (photo && (auth.currentUser?.uid || OWNER_UID) === uid) this.setAvatar(photo);
        } catch (e) { console.warn('Profil fotoğrafı okunamadı:', e.code || e.message); }
    },

    async uploadAvatar(e) {
        const file = e.target.files?.[0];
        e.target.value = '';
        const user = auth.currentUser;
        if (!file || !user) return;
        if (!file.type.startsWith('image/')) { showToast(t('toast_photo_failed'), 'error'); return; }
        try {
            // Kare kırpıp 192 piksele küçült (Firestore için hafif kalsın)
            const bmp = await createImageBitmap(file);
            const side = Math.min(bmp.width, bmp.height), S = 192;
            const canvas = document.createElement('canvas'); canvas.width = canvas.height = S;
            canvas.getContext('2d').drawImage(bmp, (bmp.width - side) / 2, (bmp.height - side) / 2, side, side, 0, 0, S, S);
            const photo = canvas.toDataURL('image/jpeg', 0.85);
            this.setAvatar(photo);
            await setDoc(doc(db, 'kitaplik', `${user.uid}__profile`), { id: '__profile', user_id: user.uid, profile: { photo, updatedAt: new Date().toISOString() } });
            showToast(t('toast_photo_saved'), 'success');
        } catch (err) {
            console.error('Profil fotoğrafı:', err.message);
            showToast(t('toast_photo_failed'), 'error');
        }
    },

    // Yönetici girişi penceresi: kenar menüdeki giriş bölümü (Google + e-posta) buraya taşınır
    toggleLoginModal(open) {
        let modal = document.getElementById('login-modal');
        if (!open) {
            if (!modal || modal.classList.contains('hidden')) return;
            modal.classList.add('opacity-0');
            modal.firstElementChild?.classList.add('scale-95');
            setTimeout(() => modal.classList.add('hidden'), 200);
            return;
        }
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'login-modal';
            modal.className = 'hidden opacity-0 fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-200';
            modal.innerHTML = `
                <div role="dialog" aria-modal="true" aria-labelledby="login-modal-title" class="scale-95 transition-transform duration-200 w-full max-w-sm rounded-2xl bg-lightBg dark:bg-dark border border-[#c9b8a6] dark:border-[#4a3829] shadow-2xl p-5 flex flex-col gap-4">
                    <div class="flex items-center justify-between gap-3 pb-3 border-b-[3px] border-double border-[#241a13] dark:border-[#c9b8a6]">
                        <h2 id="login-modal-title" class="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-900 dark:text-white"><i class="ph-bold ph-lock-simple text-sm text-[#a85a1a] dark:text-primary"></i><span>${t('admin_login')}</span></h2>
                        <button type="button" onclick="app.toggleLoginModal(false)" aria-label="${t('close')}" class="w-9 h-9 -mr-2 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-lightHighlight dark:hover:bg-surface"><i class="ph-bold ph-x text-lg"></i></button>
                    </div>
                    <div id="login-modal-body"></div>
                </div>`;
            modal.addEventListener('click', (e) => { if (e.target === modal) this.toggleLoginModal(false); });
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.classList.contains('hidden')) { e.stopImmediatePropagation(); this.toggleLoginModal(false); } }, true);
            document.body.appendChild(modal);
        }
        const form = document.getElementById('auth-logged-out');
        if (form) document.getElementById('login-modal-body')?.appendChild(form);
        document.getElementById('email-login')?.setAttribute('open', '');
        modal.querySelector('#login-modal-title span').textContent = t('admin_login');
        modal.classList.remove('hidden');
        requestAnimationFrame(() => { modal.classList.remove('opacity-0'); modal.firstElementChild?.classList.remove('scale-95'); });
    },

    async signOut() {
        await signOut(auth);
        this.toggleSidebar(false);
        showToast(t("sign_out"), "info");
    },


    async loadData() {
        // Yönetici kendi kaydını, ziyaretçi yöneticinin kitaplığını okur
        const uid = auth.currentUser?.uid || OWNER_UID;
        const q = query(collection(db, 'kitaplik'), where('user_id', '==', uid));
        const fill = (snap) => {
            const list = [];
            snap.forEach((docSnap) => { const data = docSnap.data(); if (data && data.album_data) list.push(data.album_data); });
            // Ziyaretçi yalnızca puanlaması tamamlanmış albümleri görür; Loop'taki albüm bitmemiş olsa da kartta görünür
            AppState.loopPick = AlbumUtils.loopPick(list);
            return AppState.isAdmin ? list : list.filter(a => (a.averageScore || 0) > 0);
        };
        this._lastLoad = Date.now();

        // Önce telefondaki kayıttan hemen göster (uygulama gibi anında açılır), sonra güncelini getir
        try {
            const cached = await getDocsFromCache(q);
            if (!cached.empty) {
                AppState.library = fill(cached);
                AppState.isLoading = false;
                this.renderLibrary();
            }
        } catch (e) {}

        try {
            AppState.library = fill(await getDocs(q));
        } catch (e) {
            console.error("Buluttan veri çekilirken hata: ", e.message);
            if (AppState.isLoading) { AppState.library = []; showToast(t('toast_conn_error'), "error"); }
        } finally {
            AppState.isLoading = false;
            this.renderLibrary();
            if (AppState.currentView === 'queue') this.renderQueue();
            if (AppState.currentView === 'stats') this.renderStats();
            this.cacheMissingCovers();
        }
    },

    // Kayıtlı bir albümdeki değişikliği kütüphaneye ve buluta hemen yazar
    persistIfSaved() {
        const al = AppState.currentModalAlbum;
        if (!al) return false;
        const libIdx = AppState.library.findIndex(a => a.id === al.id);
        if (libIdx === -1) return false;
        if (!al.sortAt) al.sortAt = AlbumUtils.lastActivity(AppState.library[libIdx]); al.updatedAt = new Date().toISOString();
        AppState.library[libIdx] = structuredClone(al);
        this.saveAlbumData(AppState.library[libIdx]);
        if (AppState.currentView === 'library') this.renderLibrary();
        if (AppState.currentView === 'queue') this.renderQueue();
        if (AppState.currentView === 'stats') this.renderStats();
        return true;
    },
    
    // Kapak açılmazsa sırayla: kayıtlı kopya → görsel vekili → yerel yedek
    coverFallback(img) {
        const stage = Number(img.dataset.fb || 0);
        const id = img.dataset.coverId;
        const al = id ? (AppState.library.find(a => a.id === id) || (AppState.currentModalAlbum?.id === id ? AppState.currentModalAlbum : null)) : null;
        if (!img.dataset.orig) img.dataset.orig = img.currentSrc || img.src || '';
        const orig = img.dataset.orig;
        if (stage === 0 && al?.coverData && !orig.startsWith('data:')) { img.dataset.fb = '1'; img.src = al.coverData; return; }
        if (stage <= 1 && /^https?:/.test(orig) && !orig.includes('images.weserv.nl')) { img.dataset.fb = '2'; img.src = CoverCache.proxy(orig); return; }
        img.onerror = null;
        img.removeAttribute('onerror');
        img.src = AlbumUtils.NO_COVER;
    },

    // Kapağın küçük kopyasını üretip albümle birlikte kaydeder
    async cacheCover(album) {
        try {
            if (!(await CoverCache.ensure(album))) return false;
            const lib = AppState.library.find(a => a.id === album.id);
            const modal = AppState.currentModalAlbum?.id === album.id ? AppState.currentModalAlbum : null;
            [lib, modal].forEach(o => {
                if (!o || o === album) return;
                if (album.coverData) { o.coverData = album.coverData; o.coverDataSrc = album.coverDataSrc; }
                if (album.coverMissing) o.coverMissing = album.coverMissing; else delete o.coverMissing;
            });
            if (lib) await this.saveAlbumData(lib, { skipCover: true });
            return true;
        } catch (e) { return false; }
    },

    // Kitaplıktaki eski albümlerin kapak kopyalarını arka planda tamamlar
    async cacheMissingCovers() {
        if (this._coverJob || !auth.currentUser) return;
        this._coverJob = true;
        try {
            const ids = AppState.library.filter(a => !CoverCache.isFresh(a) && a.coverMissing !== CoverCache.source(a)).map(a => a.id);
            for (const id of ids) {
                if (!auth.currentUser) break;
                const al = AppState.library.find(a => a.id === id);
                if (al && !CoverCache.isFresh(al)) await this.cacheCover(al);
                await new Promise(r => setTimeout(r, 300));
            }
        } finally { this._coverJob = false; }
    },

    async saveAlbumData(album, opts = {}) {
        const user = auth.currentUser;
        if (!user) return;
        try {
            await setDoc(doc(db, 'kitaplik', `${user.uid}_${album.id}`), {
                id: album.id.toString(),
                album_data: album,
                user_id: user.uid
            });
            // Kapak değiştiyse ya da kopyası yoksa arka planda kopyasını kaydet
            if (!opts.skipCover && !CoverCache.isFresh(album)) this.cacheCover(album);
        } catch (e) {
            console.error("Buluta kaydederken hata: ", e.message);
            showToast("Kaydedilemedi, bağlantını kontrol et.", "error");
        }
    },

    async deleteAlbumData(id) {
        try {
            const user = auth.currentUser;
            if (!user) return;

            const docId = `${user.uid}_${id}`;
            await deleteDoc(doc(db, 'kitaplik', docId));
        } catch (e) {
            console.error("Buluttan silerken hata: ", e.message);
        }
    },
    
    exportData() {
        if (AppState.library.length === 0) { showToast(t("toast_no_export"), "error"); return; }
        Utils.download(`album_diary_${Utils.todayISO()}.json`, JSON.stringify(AppState.library, null, 2), "application/json");
        showToast(t("toast_export_success"), "success");
    },

    // --- Markdown: tek albüm ve toplu dışa aktarma ---
    albumToMarkdown(album) {
        const avg = album.averageScore || AlbumUtils.runningAvg(album);
        const lines = [`## ${album.title} — ${album.artist} (${album.year || '?'})`, ''];
        const meta = [];
        if (avg > 0) meta.push(`**${avg.toFixed(1)} / 5**`);
        if (album.genres?.length) meta.push(album.genres.map(tGenre).join(', '));
        if (album.tags?.length) meta.push(album.tags.map(tg => `#${tg}`).join(' '));
        if (album.listens?.length) meta.push(`${album.listens.length} ${t('times')} ${t('nth_listen').toLowerCase()}`);
        if (meta.length) lines.push(meta.join(' · '), '');
        AlbumUtils.noteParagraphs(album.note).forEach(p => lines.push(p, ''));
        const favs = (album.tracks || []).filter(tr => tr.rating >= 4).sort((a, b) => b.rating - a.rating);
        if (favs.length) {
            lines.push(`**${t('favorite_tracks')}:**`);
            favs.forEach(tr => lines.push(`- ${tr.title} (${tr.rating}★)`));
            lines.push('');
        }
        const trackNotes = (album.tracks || []).filter(tr => tr.note && tr.note.trim());
        if (trackNotes.length) {
            lines.push(`**${t('track_notes')}:**`);
            trackNotes.forEach(tr => lines.push(`- *${tr.title}:* ${AlbumUtils.noteParagraphs(tr.note).join(' ')}`));
            lines.push('');
        }
        return lines.join('\n');
    },

    exportMarkdown() {
        const reviewed = AppState.library
            .filter(a => (a.note && a.note.trim()) || (a.tracks || []).some(tr => tr.note && tr.note.trim()))
            .sort((a, b) => new Date(AlbumUtils.lastActivity(b)) - new Date(AlbumUtils.lastActivity(a)));
        if (!reviewed.length) { showToast(t("toast_md_none"), "error"); return; }
        const md = `# RateAgainst — ${Utils.formatDate(new Date().toISOString())}\n\n` + reviewed.map(a => this.albumToMarkdown(a)).join('\n---\n\n');
        Utils.download(`rateagainst_incelemeler_${Utils.todayISO()}.md`, md, "text/markdown");
        showToast(t("toast_export_success"), "success");
    },

    importData(event) {
        if (!auth.currentUser) { showToast("Önce giriş yapmalısınız.", "error"); event.target.value = ''; return; }
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
                            this.saveAlbumData(album); 
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
        (navigator.clipboard ? navigator.clipboard.writeText(ta.value) : Promise.reject()).then(() => showToast(t("toast_copied"), "success")).catch(() => this.fallbackCopyText(ta.value));
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
            const seenGenres = new Set();
            AppState.library.forEach(a => (a.genres || []).forEach(g => { const k = Genre.key(g); if (k && !seenGenres.has(k)) { seenGenres.add(k); items.add(g.trim()); } }));
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
            const isSelected = type === 'Genre' ? (!!currentVal && Genre.same(currentVal, item)) : currentVal === item;
            const isDecade = type === 'Year' && item.toString().endsWith('s');
            const displayLabel = type === 'Genre' ? tGenre(item) : item;
            
            html += `
                <div data-value="${Utils.escapeHTML(item)}" onclick="app.setFilter('${type}', this.dataset.value)" class="px-5 py-3 hover:bg-lightHighlight dark:hover:bg-surfaceHover cursor-pointer text-sm ${isDecade ? 'font-bold bg-lightBg/50 dark:bg-surface/50 border-y border-lightBorder/30 dark:border-gray-800/50' : 'font-medium'} flex justify-between items-center transition-colors ${isSelected ? 'text-primary' : 'text-gray-600 dark:text-gray-400'}">
                    <span class="truncate pr-4 ${isDecade ? 'text-gray-800 dark:text-gray-200' : ''}">${Utils.escapeHTML(displayLabel)}</span>
                    ${isSelected ? '<i class="ph-bold ph-check text-lg"></i>' : ''}
                </div>
            `;
        });

        dd.innerHTML = html;
        this.currentDropdownType = type;
        
        dd.classList.remove('hidden');
        
        // Telefonda sayfa %75 ölçekli: ekran koordinatları CSS pikseline çevrilir
        const z = (document.documentElement.getBoundingClientRect().width / document.documentElement.offsetWidth) || 1;
        const vw = window.innerWidth / z, vh = window.innerHeight / z;
        let top = rect.bottom / z + 10;
        let left = rect.left / z;
        
        const ddWidth = Math.max(200, btn.offsetWidth * 1.5);
        dd.style.minWidth = `${ddWidth}px`;
        
        if (left + ddWidth > vw) {
            left = vw - ddWidth - 16;
        }
        
        if (top + 250 > vh) {
            top = rect.top / z - dd.offsetHeight - 10; 
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
        this.closeToolGroups();
        this.renderLibrary();
    },

    // --- Araç çubuğu: dar ekranda grupları aç/kapat (sola doğru açılır) ---
    toggleToolGroup(name) {
        const group = document.getElementById(`tools-${name}`);
        if (!group) return;
        const willOpen = !group.classList.contains('is-open');
        this.closeToolGroups();
        this.closeDropdown();
        if (willOpen) {
            group.classList.add('is-open');
            group.querySelector('.tool-trigger')?.setAttribute('aria-expanded', 'true');
        }
    },

    closeToolGroups() {
        document.querySelectorAll('.tool-group.is-open').forEach(g => {
            g.classList.remove('is-open');
            g.querySelector('.tool-trigger')?.setAttribute('aria-expanded', 'false');
        });
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
            li.className = 'px-3 py-2 hover:bg-lightHighlight dark:hover:bg-surfaceHover cursor-pointer flex justify-between items-center rounded-lg';
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
        const gIcon = document.getElementById('tools-grid-icon');
        if (gIcon) gIcon.className = `ph-fill ${{ normal: 'ph-square', small: 'ph-squares-four', xsmall: 'ph-dots-nine' }[size] || 'ph-squares-four'} text-base`;
        this.closeToolGroups();
        this.updateGridClasses(); if(AppState.currentView === 'library') this.renderLibrary();
    },
    
    updateGridClasses() {
        const grid = document.getElementById('library-grid'); if(!grid) return;
        if(AppState.gridSize === 'normal') grid.className = 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-7 md:gap-x-7 md:gap-y-9';
        else if(AppState.gridSize === 'small') grid.className = 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-x-3 gap-y-5 md:gap-x-5 md:gap-y-7';
        else grid.className = 'grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 xl:grid-cols-10 gap-x-2 gap-y-4 md:gap-x-3 md:gap-y-5';
    },
    
    toggleSort(type) {
        if (AppState.sortBy === type) AppState.sortDirection = AppState.sortDirection === 'desc' ? 'asc' : 'desc';
        else { AppState.sortBy = type; AppState.sortDirection = 'desc'; }
        localStorage.setItem('albumDiarySortBy', AppState.sortBy);
        localStorage.setItem('albumDiarySortDirection', AppState.sortDirection);
        this.updateSortClasses(); if (AppState.currentView === 'library') this.renderLibrary();
    },
    
    updateSortClasses() {
        const sIcon = document.getElementById('tools-sort-icon');
        const sDir = document.getElementById('tools-sort-dir');
        if (sIcon) sIcon.className = `ph-bold ${{ dateAdded: 'ph-calendar-plus', year: 'ph-clock', rating: 'ph-star' }[AppState.sortBy] || 'ph-calendar-plus'} text-base`;
        if (sDir) sDir.className = `ph-bold ph-arrow-${AppState.sortDirection === 'desc' ? 'down' : 'up'} text-[11px]`;
        ['dateAdded', 'year', 'rating'].forEach(type => {
            const btn = document.getElementById(`btn-sort-${type}`); const iconDir = document.getElementById(`icon-sort-${type}-dir`);
            if (!btn || !iconDir) return;
            if (AppState.sortBy === type) {
                btn.classList.add('text-primary', 'bg-primary/10'); btn.classList.remove('text-gray-500');
                iconDir.className = `ph-bold ph-arrow-${AppState.sortDirection === 'desc' ? 'down' : 'up'} text-[11px]`; iconDir.style.opacity = '1';
            } else {
                btn.classList.remove('text-primary', 'bg-primary/10'); btn.classList.add('text-gray-500');
                iconDir.className = 'ph-bold ph-arrow-down text-[11px]'; iconDir.style.opacity = '0.3';
            }
        });
    },

    renderLibrary() {
        const grid = document.getElementById('library-grid'), emptyState = document.getElementById('empty-library-state');
        if(!grid || !emptyState) return;

        this.renderNowListening();
        this.renderStatusChips();

        // Yükleniyor: iskelet kartlar
        if (AppState.isLoading) {
            emptyState.classList.add('hidden'); emptyState.classList.remove('flex');
            grid.innerHTML = Array.from({ length: 8 }, () => `
                <div class="rounded-xl overflow-hidden border border-lightBorder dark:border-gray-800" aria-hidden="true">
                    <div class="skeleton w-full pt-[100%]"></div>
                    <div class="p-3 flex gap-2 items-center bg-white dark:bg-surface">
                        <div class="skeleton w-9 h-9 rounded-full flex-shrink-0"></div>
                        <div class="flex-1 flex flex-col gap-2"><div class="skeleton h-3 w-4/5 rounded"></div><div class="skeleton h-3 w-1/2 rounded"></div></div>
                    </div>
                </div>`).join('');
            return;
        }

        const fGroup = AppState.filterGroup;
        const fYear = AppState.filterYear;
        const fGenre = AppState.filterGenre;
        const fLabel = AppState.filterLabel;
        const fStatus = AppState.filterStatus;

        document.getElementById('icon-filter-group')?.classList.toggle('text-primary', !!fGroup);
        document.getElementById('icon-filter-genre')?.classList.toggle('text-primary', !!fGenre);
        document.getElementById('icon-filter-year')?.classList.toggle('text-primary', !!fYear);
        document.getElementById('icon-filter-label')?.classList.toggle('text-primary', !!fLabel);
        document.getElementById('tools-filter-dot')?.classList.toggle('hidden', !(fGroup || fGenre || fYear || fLabel));

        let filtered = AppState.library.filter(a => {
            if (fStatus && AlbumUtils.status(a) !== fStatus) return false;
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
            if (fGenre && (!a.genres || !a.genres.some(g => Genre.same(g, fGenre)))) return false;
            if (fLabel && a.label !== fLabel) return false;
            return true;
        });

        filtered.sort((a, b) => {
            const dir = AppState.sortDirection === 'desc' ? 1 : -1;
            if (AppState.sortBy === 'rating') return ((b.averageScore || AlbumUtils.runningAvg(b)) - (a.averageScore || AlbumUtils.runningAvg(a))) * dir;
            if (AppState.sortBy === 'year') return ((parseInt(b.year) || 0) - (parseInt(a.year) || 0)) * dir;
            return (new Date(AlbumUtils.lastActivity(b)) - new Date(AlbumUtils.lastActivity(a))) * dir;
        });

        // Boş durum: giriş yapılmamışsa giriş butonu, yapılmışsa albüm ekleme
        if (AppState.library.length === 0) {
            grid.innerHTML = '';
            emptyState.innerHTML = AppState.isLoggedIn ? `
                <div class="w-20 h-20 bg-lightHighlight dark:bg-surface rounded-full flex items-center justify-center mb-4">
                    <i class="ph-fill ph-music-notes text-4xl text-gray-600 dark:text-gray-400"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${t('no_albums')}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm max-w-xs mx-auto mb-6">${t('no_albums_desc')}</p>
                <button onclick="app.showView('search')" class="bg-primary text-darker h-12 px-6 rounded-full font-bold active:scale-95 transition-transform shadow-lg flex items-center gap-2">
                    <i class="ph-bold ph-magnifying-glass"></i> <span>${t('add_first_album')}</span>
                </button>` : `
                <div class="w-20 h-20 bg-lightHighlight dark:bg-surface rounded-full flex items-center justify-center mb-4">
                    <i class="ph-fill ph-vinyl-record text-4xl text-primary"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${t('login_empty_title')}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm max-w-xs mx-auto mb-6">${t('login_empty_desc')}</p>
                <button onclick="app.signIn()" class="bg-white text-gray-800 border border-lightBorder h-12 px-6 rounded-full font-bold active:scale-95 transition-transform shadow-lg flex items-center gap-3">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" alt=""> <span>${t('sign_in_google')}</span>
                </button>`;
            emptyState.classList.remove('hidden'); emptyState.classList.add('flex');
            return;
        }
        emptyState.classList.add('hidden'); emptyState.classList.remove('flex'); grid.innerHTML = '';
        if (filtered.length === 0) { grid.innerHTML = `<div class="col-span-full text-center py-10 text-gray-600 dark:text-gray-400">${t('no_data')}</div>`; return; }

        const fragment = document.createDocumentFragment();

        const isXSmall = AppState.gridSize === 'xsmall';
        const isSmall = AppState.gridSize === 'small';

                // Dergi kartları: kapak, altında başlık + künye + tür, sağda yatık puan rozeti.
        // Yazılar ve rozet kart genişliğine göre ölçeklenir (style.css: .album-card), her ölçekte aynı bilgiler görünür.
        const noCoverText = t('no_cover').replace(/ /g, '+');

        filtered.forEach(album => {
            const avg = album.averageScore || 0;
            const status = AlbumUtils.status(album);
            const prog = AlbumUtils.progress(album);
            const partialAvg = avg > 0 ? 0 : AlbumUtils.runningAvg(album);
            const shown = avg > 0 ? avg : partialAvg;
            const title = Utils.escapeHTML(album.title);
            const artist = Utils.escapeHTML(album.artist);
            const year = Utils.escapeHTML(album.year);
            const genre = (album.genres && album.genres.length) ? Utils.escapeHTML(tGenre(album.genres[0])) : '';

            const statusBadge = status === 'listening'
                ? `<span class="ac-status absolute bg-lightBg/95 dark:bg-dark/90 text-[#a85a1a] dark:text-primary font-bold">${t('badge_listening')}</span>`
                : status === 'planned'
                ? `<span class="ac-status absolute bg-lightBg/95 dark:bg-dark/90 text-gray-700 dark:text-gray-300 font-bold">${t('badge_planned')}</span>`
                : '';

            // Puanlamanın bittiği tarih: kapağın sol üstünde minik etiket
            const doneAt = avg > 0 ? (album.completedAt || album.sortAt || album.updatedAt || album.dateAdded) : '';
            const doneLabel = doneAt ? new Date(doneAt).toLocaleDateString(AppState.language === 'en' ? 'en-GB' : 'tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
            const dateBadge = doneLabel ? `<time datetime="${Utils.escapeHTML(doneAt)}" title="${t('rated_on')}: ${doneLabel}" class="ac-date">${doneLabel}</time>` : `<span class="ac-date" aria-hidden="true">&nbsp;</span>`;

            const progressBar = (avg === 0 && prog.rated > 0)
                ? `<div class="h-0.5 mt-2 bg-[#e6dbcf] dark:bg-[#3b2b20]" role="progressbar" aria-valuenow="${prog.pct}" aria-valuemin="0" aria-valuemax="100"><div class="h-full bg-[#a85a1a] dark:bg-primary" style="width:${prog.pct}%"></div></div>`
                : '';

            const badgeLabel = avg > 0 ? `${t('album_avg')}: ${avg.toFixed(1)}` : (partialAvg > 0 ? `${t('so_far_avg')}: ${partialAvg.toFixed(1)}` : '');
            const badge = `<span ${badgeLabel ? `role="img" aria-label="${badgeLabel}" title="${badgeLabel}"` : 'aria-hidden="true"'} class="score-badge ${avg > 0 ? '' : 'is-partial'} ac-badge flex-shrink-0 rounded-full flex items-center justify-center font-black -rotate-[8deg] ${AlbumUtils.tier(shown).text}">${shown > 0 ? shown.toFixed(1) : '–'}</span>`;

            const card = document.createElement('div');
            card.className = 'album-card group flex flex-col min-w-0 cursor-pointer outline-offset-4';
            card.onclick = () => this.openAlbumModal(album.id, album.title, album.artist, album.year);
            card.tabIndex = 0; card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `${album.title} — ${album.artist}`);
            card.onkeydown = (e) => { if (e.target === card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); card.click(); } };


            card.innerHTML = `
                ${dateBadge}<div class="relative w-full pt-[100%] shrink-0 overflow-hidden bg-lightHighlight dark:bg-surface shadow-[0_10px_22px_rgba(36,26,19,0.22)] dark:shadow-[0_10px_22px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:-translate-y-1 group-active:scale-[0.98]">
                    <img loading="lazy" ${AlbumUtils.coverAttrs(album)} alt="" class="absolute inset-0 w-full h-full object-cover object-center">
                     
                </div>
                <div class="ac-body flex items-start justify-between">
                    <div class="min-w-0 flex-1">
                        <h3 class="ac-title font-black italic leading-tight break-words text-gray-900 dark:text-white" title="${title}">${title}</h3>
                                                <p class="ac-meta text-gray-600 dark:text-gray-400 min-w-0">
                            <button onclick="event.stopPropagation(); app.searchFromLink(this.textContent)" class="block max-w-full break-words hover:underline text-left">${artist}</button>
                        </p>
                        <p class="ac-sub truncate text-gray-600 dark:text-gray-400">${year}${genre ? ` · ${genre}` : ''}</p>
                    </div>
                    ${badge}
                </div>
                ${progressBar}
            `;
            fragment.appendChild(card);
        });
        grid.appendChild(fragment);
    },

    // "Şu an dinliyorum" kartı: durumu "listening" olan en son güncellenen albüm
        // Kitaplığın üstü: solda "şu an dinliyorum", sağda en sevilen 10 albümün rafı
    renderNowListening() {
        const top = document.getElementById('library-top');
        const box = document.getElementById('now-listening');
        const shelf = document.getElementById('shelf');
        if (!top || !box || !shelf) return;
        if (AppState.isLoading || !AppState.isLoggedIn || AppState.filterStatus || AppState.library.length === 0) {
            top.classList.add('hidden'); box.innerHTML = ''; shelf.innerHTML = ''; return;
        }

        const current = AppState.isAdmin ? AlbumUtils.loopPick(AppState.library) : AppState.loopPick;

        if (current) {
            const avg = AlbumUtils.runningAvg(current);
            const complete = (current.averageScore || 0) > 0;
            const shown = current.averageScore || avg;
            // Parça parça puan şeridi: çubuğun boyu puan, rengi puan aralığı; puanlanmamışlar kesikli
            const tracks = current.tracks || [];
            const bars = (h, maxW = 18) => `<span class="loop-strip flex items-end gap-[3px] w-full" style="height:${h}px" aria-hidden="true">${tracks.map(tr => {
                const r = tr.rating || 0;
                const tip = `${Utils.escapeHTML(tr.number)}. ${Utils.escapeHTML(tr.title)}${r > 0 ? ` · ${r.toFixed(1)}` : ''}`;
                return r > 0
                    ? `<span class="flex-1 h-full flex items-end ${AlbumUtils.tier(r).text}" style="max-width:${maxW}px" title="${tip}"><span class="block w-full bg-current rounded-t-[2px]" style="height:${Math.max(10, r / 5 * 100)}%"></span></span>`
                    : `<span class="flex-1 h-full flex items-end" style="max-width:${maxW}px" title="${tip}"><span class="block w-full h-[22%] border border-dashed border-[#c9b8a6] dark:border-[#5a4637] rounded-t-[2px]"></span></span>`;
            }).join('')}</span>`;
            // Şimdilik en iyi parça ve sıradaki (puanlanmamış ilk) parça
            const best = tracks.filter(tr => tr.rating > 0).sort((a, b) => b.rating - a.rating || parseInt(a.number) - parseInt(b.number))[0];
            const next = tracks.find(tr => !(tr.rating > 0));
            const facts = [
                best ? `<span class="truncate">${t('loop_best')}: <i class="font-bold text-gray-900 dark:text-white">${Utils.escapeHTML(best.title)}</i> <b class="${AlbumUtils.tier(best.rating).text}">${best.rating.toFixed(1)}</b></span>` : '',
                next ? `<span class="truncate">${t('loop_next')}: <i class="text-gray-900 dark:text-white">${Utils.escapeHTML(next.number)}. ${Utils.escapeHTML(next.title)}</i></span>` : ''
            ].filter(Boolean).join('');
            box.innerHTML = `
                <button onclick="app.openAlbumModal('${Utils.escapeHTML(current.id)}')" class="w-full h-full text-left flex gap-4 p-3 rounded-2xl bg-white/70 dark:bg-surface border border-[#c9b8a6] dark:border-[#4a3829] hover:bg-lightHighlight dark:hover:bg-surfaceHover transition-colors">
                    <span class="relative w-24 h-24 lg:h-auto lg:w-auto lg:min-w-[96px] aspect-square self-center lg:self-stretch flex-shrink-0 shadow-[0_8px_18px_rgba(36,26,19,0.25)]"><img ${AlbumUtils.coverAttrs(current)} alt="" class="absolute inset-0 w-full h-full object-cover"></span>
                    <span class="flex flex-col gap-1 min-w-0 flex-1 lg:flex-none lg:max-w-[300px] justify-center">
                        <span class="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] text-[#a85a1a] dark:text-primary"><i class="ph-bold ph-repeat text-sm"></i>${t('loop_title')}</span>
                        <span class="text-lg font-black italic leading-tight text-gray-900 dark:text-white line-clamp-2">${Utils.escapeHTML(current.title)}</span>
                        <span class="text-sm text-gray-600 dark:text-gray-400 truncate">${Utils.escapeHTML(current.artist)} · <span class="text-[0.85em]">${Utils.escapeHTML(current.year)}</span></span>
                        ${(current.genres?.length || (current.label && current.label !== t('unknown'))) ? `<span class="text-sm text-gray-600 dark:text-gray-400 truncate">${[current.genres?.[0] ? `<span class="text-[0.75em]">${Utils.escapeHTML(tGenre(current.genres[0]))}</span>` : '', current.label && current.label !== t('unknown') ? `<span class="text-[0.5em] tracking-wide">${Utils.escapeHTML(current.label)}</span>` : ''].filter(Boolean).join(' <span class="text-[0.75em]">·</span> ')}</span>` : ''}
                        <span class="lg:hidden mt-1">${bars(12)}</span>
                    </span>
                    <span class="loop-extra hidden lg:flex flex-col justify-center gap-2.5 flex-1 min-w-0 pl-5 border-l border-[#e6dbcf] dark:border-[#3b2b20]">
                        ${bars(46, 40)}
                        ${facts ? `<span class="flex flex-wrap gap-x-5 gap-y-0.5 text-xs text-gray-600 dark:text-gray-400 min-w-0">${facts}</span>` : ''}
                    </span>
                    <span role="img" aria-label="${t(complete ? 'album_avg' : 'so_far_avg')}: ${shown > 0 ? shown.toFixed(1) : '–'}" title="${t(complete ? 'album_avg' : 'so_far_avg')}" class="score-badge ${complete ? '' : 'is-partial'} self-start flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center -rotate-[8deg] text-base font-black ${AlbumUtils.tier(shown).text}">${shown > 0 ? shown.toFixed(1) : '–'}</span>
                </button>`;
            box.classList.remove('hidden');
        } else { box.classList.add('hidden'); box.innerHTML = ''; }

        // Raf: en fazla 10 plak, eklenme sırasıyla soldan sağa
        const favs = AppState.library.filter(a => a.shelfAt).sort((a, b) => a.shelfAt.localeCompare(b.shelfAt)).slice(0, 10);
        const tilts = [-2.5, 1.5, -1, 2, -1.5, 1, -2, 2.5, -0.5, 1.5];
        const records = favs.map((a, i) => `
            <button type="button" onclick="app.shelfTap(${i}, '${Utils.escapeHTML(a.id)}')" class="shelf-rec" style="--i:${i}; --tilt:${tilts[i]}deg" data-title="${Utils.escapeHTML(a.title)}" data-artist="${Utils.escapeHTML(a.artist)}" aria-label="${Utils.escapeHTML(a.title)} — ${Utils.escapeHTML(a.artist)}" title="${Utils.escapeHTML(a.title)} — ${Utils.escapeHTML(a.artist)}">
                <span class="shelf-disc" aria-hidden="true"><span class="shelf-disc-spin"><img ${AlbumUtils.coverAttrs(a)} alt="" class="shelf-disc-label"></span></span>
                <span class="shelf-sleeve"><img ${AlbumUtils.coverAttrs(a)} alt="" loading="lazy"></span>
            </button>`).join('');
        const slots = Array.from({ length: 10 - favs.length }, (_, k) => `<span class="shelf-slot" style="--i:${favs.length + k}" aria-hidden="true"></span>`).join('');
        const open = this._shelfOpen !== false;
        // Web: raf, içindeki plak sayısı kadar yer kaplar; kalanını Loop'ta paneli alır
        top.style.setProperty('--shelf-n', favs.length);

        shelf.innerHTML = `
            <div class="h-full flex flex-col rounded-2xl bg-white/70 dark:bg-surface border border-[#c9b8a6] dark:border-[#4a3829] pt-3 px-4 overflow-hidden">
                <div class="flex items-center justify-between gap-3">
                    <h2 id="shelf-title" class="text-[11px] font-bold tracking-[0.15em] text-[#a85a1a] dark:text-primary">${t('shelf_title')}</h2>
                    <span class="flex items-center gap-1">
                    <button type="button" onclick="app.toggleShelfOpen()" aria-controls="shelf-body" aria-expanded="${open}" aria-label="${t(open ? 'shelf_hide' : 'shelf_show')}" title="${t(open ? 'shelf_hide' : 'shelf_show')}" class="shelf-toggle sm:hidden w-10 h-10 -my-2 -mr-2.5 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-lightHighlight dark:hover:bg-surfaceHover transition-colors"><i class="ph-bold ph-caret-down text-base"></i></button>
                    </span>
                </div>
                <div id="shelf-body" class="flex-1 flex flex-col min-h-0">
                    ${favs.length === 0 ? `<p class="text-xs text-gray-600 dark:text-gray-400 mt-1">${t('shelf_empty')}</p>` : ''}
                    <div class="shelf-row hide-scrollbar flex-1">${records}${slots}</div>
                    <div class="shelf-board" aria-hidden="true"></div>
                    ${favs.length ? `<p class="shelf-caption" aria-live="polite"></p>` : ''}
                </div>
            </div>`;
        shelf.classList.toggle('is-collapsed', !open);
        shelf.classList.remove('hidden'); this.layoutShelf(); this.bindShelfSwipe();

        // Tek panel kaldıysa tüm genişliği kaplasın
        shelf.classList.toggle('lg:col-span-2', !current);
        top.classList.remove('hidden');
    },

        // --- Raf, telefonda: öndeki plak düz, diğerleri sandıktaki plaklar gibi yan yatık dizilir ---
    shelfIsCompact() { return window.matchMedia('(max-width: 640px)').matches; },

    layoutShelf() {
        const row = document.querySelector('#shelf .shelf-row');
        if (!row) return;
        const recs = [...row.querySelectorAll('.shelf-rec')];
        const n = recs.length;
        let act = this._shelfActive ?? -1;
        if (act >= n) act = -1;
        this._shelfActive = act;
        // Telefonda plaklar rafa soldan sağa yayılır; sığmazsa hafifçe üst üste biner
        const size = recs[0]?.offsetWidth || 76;
        const W = row.clientWidth;
        const step = n > 1 ? Math.min(size + 10, (W - size - 4) / (n - 1)) : 0;
        const start = n > 1 ? Math.max(0, (W - size - step * (n - 1)) / 2) : Math.max(0, (W - size) / 2);
        recs.forEach((el, i) => {
            el.style.setProperty('--x', `${Math.round(start + i * step)}px`);
            el.style.setProperty('--z', String(i === act ? 50 : i + 1));
            el.classList.toggle('is-front', i === act);
        });
        row.classList.toggle('has-front', act >= 0);
        const cap = document.querySelector('#shelf .shelf-caption');
        if (cap) {
            const a = recs[act];
            cap.innerHTML = a
                ? `<b class="italic text-gray-900 dark:text-white">${Utils.escapeHTML(a.dataset.title)}</b> · ${Utils.escapeHTML(a.dataset.artist)}`
                : t('shelf_hint');
        }
    },

    // Telefonda: bir plağa dokununca raftan çıkar, aynı plağa bir daha dokununca albüm açılır
    shelfTap(i, id) {
        if (Date.now() - (this._shelfSwiped || 0) < 350) return;
        if (this.shelfIsCompact() && i !== this._shelfActive) {
            this._shelfActive = i;
            this.layoutShelf();
            return;
        }
        this.openAlbumModal(id);
    },

    shelfStep(d) {
        const n = document.querySelectorAll('#shelf .shelf-rec').length;
        if (!n) return;
        const cur = this._shelfActive ?? -1;
        this._shelfActive = cur < 0 ? (d > 0 ? 0 : n - 1) : (cur + d + n) % n;
        this.layoutShelf();
    },

    // Telefonda rafı aç/kapat (site her açıldığında raf açık gelir)
    toggleShelfOpen() {
        this._shelfOpen = this._shelfOpen === false;
        const shelf = document.getElementById('shelf');
        const btn = shelf?.querySelector('.shelf-toggle');
        shelf?.classList.toggle('is-collapsed', !this._shelfOpen);
        if (btn) {
            const label = t(this._shelfOpen ? 'shelf_hide' : 'shelf_show');
            btn.setAttribute('aria-expanded', this._shelfOpen);
            btn.setAttribute('aria-label', label);
            btn.title = label;
        }
        if (this._shelfOpen) this.layoutShelf();
    },

    bindShelfSwipe() {
        const row = document.querySelector('#shelf .shelf-row');
        if (!row) return;
        let sx = null;
        row.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
        row.addEventListener('touchend', (e) => {
            if (sx === null) return;
            const dx = e.changedTouches[0].clientX - sx;
            sx = null;
            if (Math.abs(dx) > 30) { this._shelfSwiped = Date.now(); this.shelfStep(dx < 0 ? 1 : -1); }
        }, { passive: true });
        if (!this._shelfResizeBound) {
            this._shelfResizeBound = true;
            let tm;
            window.addEventListener('resize', () => { clearTimeout(tm); tm = setTimeout(() => this.layoutShelf(), 120); });
        }
    },

        // Albüm panelindeki döngü düğmesi: kitaplığın üstündeki "Loop'ta" kartında bu albüm görünsün (aynı anda tek albüm)
    toggleLoop() {
        const al = AppState.currentModalAlbum;
        if (!al) return;
        if (al.loopAt) {
            delete al.loopAt;
            showToast(t('loop_removed'), 'info');
        } else {
            AppState.library.filter(a => a.loopAt && a.id !== al.id).forEach(a => { delete a.loopAt; this.saveAlbumData(a); });
            al.loopAt = new Date().toISOString();
            showToast(t('loop_added'), 'success');
        }
        this.updateLoopButton();
        if (!this.persistIfSaved()) this.updateModalButtons();
        this.renderNowListening();
    },

    updateLoopButton() {
        const btn = document.getElementById('loop-btn');
        const al = AppState.currentModalAlbum;
        if (!btn || !al) return;
        const on = !!al.loopAt;
        const label = on ? t('loop_remove_btn') : t('loop_add_btn');
        btn.setAttribute('aria-pressed', on);
        btn.setAttribute('aria-label', label);
        btn.title = label;
        btn.innerHTML = `<i class="${on ? 'ph-fill' : 'ph-bold'} ph-repeat text-lg"></i>`;
        btn.className = `w-11 h-11 rounded-full flex items-center justify-center transition-colors ${on ? 'text-[#a85a1a] dark:text-primary bg-primary/10' : 'text-gray-700 dark:text-gray-300 hover:bg-lightHighlight dark:hover:bg-surface'}`;
    },

    // Albüm panelindeki plak düğmesi: rafa koy / raftan kaldır (en fazla 10)
    toggleShelf() {
        const al = AppState.currentModalAlbum;
        if (!al) return;
        if (al.shelfAt) {
            delete al.shelfAt;
            showToast(t('shelf_removed'), 'info');
        } else {
            const n = AppState.library.filter(a => a.shelfAt && a.id !== al.id).length;
            if (n >= 10) { showToast(t('shelf_full'), 'error'); return; }
            al.shelfAt = new Date().toISOString();
            showToast(t('shelf_added'), 'success');
        }
        this.updateShelfButton();
        if (!this.persistIfSaved()) this.updateModalButtons();
        this.renderNowListening();
    },

    updateShelfButton() {
        const btn = document.getElementById('shelf-btn');
        const al = AppState.currentModalAlbum;
        if (!btn || !al) return;
        const on = !!al.shelfAt;
        const label = on ? t('shelf_remove_btn') : t('shelf_add_btn');
        btn.setAttribute('aria-pressed', on);
        btn.setAttribute('aria-label', label);
        btn.title = label;
        btn.innerHTML = `<i class="${on ? 'ph-fill' : 'ph-bold'} ph-vinyl-record text-lg"></i>`;
        btn.className = `w-11 h-11 rounded-full flex items-center justify-center transition-colors ${on ? 'text-[#a85a1a] dark:text-primary bg-primary/10' : 'text-gray-700 dark:text-gray-300 hover:bg-lightHighlight dark:hover:bg-surface'}`;
    },

    renderStatusChips() {
        const box = document.getElementById('status-chips'); const issueEl = document.getElementById('header-issue'); if (issueEl) issueEl.textContent = `${t('issue_label')} · № ${AppState.library.length}`.toLocaleUpperCase(AppState.language === 'en' ? 'en-US' : 'tr-TR');
        if (!box) return;
        if (!AppState.isLoggedIn || AppState.library.length === 0) { box.innerHTML = ''; return; }
        const counts = { planned: 0, listening: 0, done: 0 };
        AppState.library.forEach(a => { counts[AlbumUtils.status(a)]++; });
        const chips = [['', t('status_all'), AppState.library.length, 'ph-squares-four'], ['listening', t('status_listening'), counts.listening, 'ph-headphones'], ['planned', t('status_planned'), counts.planned, 'ph-clock-countdown'], ['done', t('status_done'), counts.done, 'ph-check-circle']];
        // Masaüstü: yan yana çipler · Telefon: seçili durum tek düğmede, diğerleri altında açılan listede
        const pills = chips.map(([val, label, n, icon]) => {
            const active = AppState.filterStatus === val;
            return `<button onclick="app.setStatusFilter('${val}')" aria-pressed="${active}" aria-label="${label}: ${n}" title="${label}" class="hidden sm:inline-flex h-9 px-4 items-center gap-1.5 rounded-full text-xs font-bold whitespace-nowrap flex-shrink-0 border transition-colors ${active ? 'bg-gray-900 border-gray-900 text-lightBg dark:bg-gray-100 dark:border-gray-100 dark:text-dark' : 'bg-transparent border-[#c9b8a6] dark:border-[#4a3829] text-gray-800 dark:text-gray-200 hover:bg-lightHighlight dark:hover:bg-surface'}"><i class="${active ? 'ph-fill' : 'ph-bold'} ${icon} text-base" aria-hidden="true"></i><span>${label}</span><span class="${active ? 'opacity-70' : 'text-gray-600 dark:text-gray-400'}">${n}</span></button>`;
        }).join('');
        const cur = chips.find(c => c[0] === AppState.filterStatus) || chips[0];
        const items = chips.map(([val, label, n, icon]) => {
            const active = AppState.filterStatus === val;
            return `<button type="button" role="menuitemradio" aria-checked="${active}" onclick="app.toggleStatusMenu(false); app.setStatusFilter('${val}')" class="w-full h-11 px-3 flex items-center gap-3 rounded-xl text-sm font-bold text-left transition-colors ${active ? 'bg-lightHighlight dark:bg-surfaceHover text-gray-900 dark:text-white' : 'text-gray-800 dark:text-gray-200 hover:bg-lightHighlight dark:hover:bg-surfaceHover'}"><i class="${active ? 'ph-fill' : 'ph-bold'} ${icon} text-lg" aria-hidden="true"></i><span class="flex-1">${label}</span><span class="text-xs ${active ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}">${n}</span>${active ? '<i class="ph-bold ph-check text-sm text-[#a85a1a] dark:text-primary" aria-hidden="true"></i>' : '<span class="w-[14px]"></span>'}</button>`;
        }).join('');
        box.innerHTML = `${pills}
            <div class="status-menu sm:hidden relative">
                <button type="button" id="status-menu-btn" onclick="app.toggleStatusMenu()" aria-haspopup="true" aria-expanded="false" aria-controls="status-menu-list" aria-label="${cur[1]}: ${cur[2]}" class="h-9 pl-2.5 pr-2 inline-flex items-center gap-1 rounded-full text-xs font-bold whitespace-nowrap border bg-gray-900 border-gray-900 text-lightBg dark:bg-gray-100 dark:border-gray-100 dark:text-dark"><i class="ph-fill ${cur[3]} text-base" aria-hidden="true"></i><span class="opacity-80">${cur[2]}</span><i class="ph-bold ph-caret-down text-[11px] opacity-70 status-caret" aria-hidden="true"></i></button>
                <div id="status-menu-list" role="menu" class="status-menu-list hidden absolute left-0 top-full mt-2 z-50 w-56 p-1.5 rounded-2xl bg-[#fbf8f4] dark:bg-surface border border-[#c9b8a6] dark:border-[#4a3829] shadow-[0_16px_40px_rgba(36,26,19,0.25)]">${items}</div>
            </div>`;
    },

    // Telefonda durum listesi: aç/kapat, dışarıya dokununca kapanır
    toggleStatusMenu(force) {
        const list = document.getElementById('status-menu-list');
        const btn = document.getElementById('status-menu-btn');
        if (!list || !btn) return;
        const open = typeof force === 'boolean' ? force : list.classList.contains('hidden');
        list.classList.toggle('hidden', !open);
        btn.setAttribute('aria-expanded', open);
        btn.classList.toggle('is-open', open);
        if (open && !this._statusMenuBound) {
            this._statusMenuBound = true;
            document.addEventListener('click', (e) => {
                const l = document.getElementById('status-menu-list');
                if (!l || l.classList.contains('hidden') || e.target.closest('.status-menu')) return;
                this.toggleStatusMenu(false);
            }, true);
            document.addEventListener('keydown', (e) => {
                const l = document.getElementById('status-menu-list');
                if (e.key === 'Escape' && l && !l.classList.contains('hidden')) { this.toggleStatusMenu(false); document.getElementById('status-menu-btn')?.focus(); }
            });
        }
    },

    setStatusFilter(val) {
        AppState.filterStatus = val;
        this.renderLibrary();
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
                const albums = await MusicSource.searchAlbums(input);
                if (albums.length === 0 && resCon) { resCon.innerHTML = `<div class="col-span-full text-center p-8 text-gray-500">${t('no_results')}</div>`; return; }
                this.renderSearchResults(albums);
            } else {
                const { name, albums } = await MusicSource.searchArtist(input);
                if (!name && resCon) { resCon.innerHTML = `<div class="col-span-full text-center p-8 text-gray-500">${t('no_results')}</div>`; return; }
                if (albums.length === 0 && resCon) { resCon.innerHTML = `<div class="col-span-full text-center p-8 text-gray-500">${t('no_studio_albums')}</div>`; return; }
                this.renderSearchResults(albums, name);
            }
        } catch (e) { showToast(t('toast_conn_error'), "error"); } 
        finally { 
            if(load) { load.classList.add('hidden'); load.classList.remove('flex'); }
            AppState.isSearching = false; 
            if(btnSearch) btnSearch.disabled = false; 
        }
    },

    // Arama sonuçları (MusicBrainz + Deezer birleşik liste)
    renderSearchResults(items, fallbackArtist = null) {
        const con = document.getElementById('search-results'); 
        if(!con) return;
        con.innerHTML = '';
        this._searchItems = new Map(items.map(it => [it.id, it]));
        const frag = document.createDocumentFragment();

        items.forEach(it => {
            const artistName = it.artist || fallbackArtist || t('unknown');
            const title = Utils.escapeHTML(it.title), artist = Utils.escapeHTML(artistName);
            const year = it.year || '';
            // Aynı albüm kitaplıkta MusicBrainz ya da Deezer kimliğiyle kayıtlı olabilir
            const libAlbum = AppState.library.find(a => a.id === it.id || (it.deezerId && (a.deezerId === it.deezerId || a.id === `dz_${it.deezerId}`)));
            const inLib = !!libAlbum;
            const inQueue = libAlbum && AlbumUtils.status(libAlbum) === 'planned';
            const openId = libAlbum ? libAlbum.id : it.id;

            const card = document.createElement('div');
            card.className = `bg-white dark:bg-surface p-2.5 rounded-xl border ${inLib ? 'border-primary' : 'border-lightBorder dark:border-gray-800'} flex gap-3 active:scale-[0.98] transition-transform shadow-sm cursor-pointer hover:bg-lightHighlight dark:hover:bg-surfaceHover`;
            card.onclick = () => this.openAlbumModal(openId, it.title, artistName, year, it.coverBig || null);
            card.tabIndex = 0; card.setAttribute('role', 'button');
            card.onkeydown = (e) => { if (e.target === card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); card.click(); } };

            const laterBtn = !inLib
                ? `<button class="later-btn mt-2 self-start h-8 px-3 rounded-full border border-lightBorder dark:border-gray-700 text-[11px] font-bold text-gray-800 dark:text-gray-200 hover:bg-primary/10 hover:text-primary flex items-center gap-1.5 transition-colors"><i class="ph-bold ph-clock-countdown"></i> ${t('listen_later')}</button>`
                : '';

            card.innerHTML = `
                <img loading="lazy" src="${Utils.escapeHTML(it.cover || AlbumUtils.NO_COVER)}" alt="" onerror="app.coverFallback(this)" class="w-20 h-20 bg-lightHighlight rounded-lg object-cover flex-shrink-0">
                <div class="flex flex-col justify-center overflow-hidden flex-grow">
                    <h4 class="font-bold text-gray-900 dark:text-white truncate text-sm md:text-base italic">${title}</h4>
                    <p class="text-xs text-gray-600 dark:text-gray-400 truncate mb-1">${artist}</p>
                    <div class="flex gap-1.5 mt-1 flex-wrap">
                        ${year ? `<span class="text-[11px] bg-lightBg dark:bg-darker px-2 py-0.5 rounded text-gray-700 dark:text-gray-300 font-bold">${Utils.escapeHTML(year)}</span>` : ''}
                        <span class="text-[11px] bg-lightHighlight dark:bg-gray-800 px-2 py-0.5 rounded text-gray-700 dark:text-gray-300 font-bold">${it.type === 'EP' ? 'EP' : t('studio_album')}</span>
                        ${inLib ? `<span class="text-[11px] bg-primary/10 text-[#a85a1a] dark:text-primary px-2 py-0.5 rounded font-bold flex items-center gap-1"><i class="ph-fill ph-check-circle"></i> ${inQueue ? t('in_queue') : t("added_to_lib")}</span>` : ''}
                    </div>
                    ${laterBtn}
                </div>`;
            const later = card.querySelector('.later-btn');
            if (later) later.onclick = (e) => { e.stopPropagation(); this.addToQueue(it.id, it.title, artistName, year, it.coverBig || null, later); };
            frag.appendChild(card);
        });
        con.appendChild(frag);
    },

    async openAlbumModal(mbid, title, artist, year, defCover = null) {
        const modal = document.getElementById('album-modal');
        const tl = document.getElementById('modal-tracklist');
        if(!modal || !tl) return;

        this.isEditMode = false; 
        modal.querySelector('.modal-content')?.classList.remove('is-editing'); 
        document.getElementById('cover-edit-section')?.classList.add('hidden');
        document.getElementById('cover-options')?.classList.add('hidden');
        this._coverOptions = []; this.setModalReview(false); this.toggleModalMenu(false);
        document.getElementById('edit-mode-btn')?.classList.remove('bg-primary/20', 'text-primary');
        document.getElementById('auto-fetch-genre-btn')?.classList.add('hidden');
        
        modal.classList.remove('hidden');
        modal.classList.add('flex'); 
        if (!history.state?.raModal) history.pushState({ raModal: true }, '');
        
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
        
        clearTimeout(this._closeTimer); tl.innerHTML = `<div class="flex justify-center p-8"><i class="ph-bold ph-spinner-gap animate-spin text-3xl text-primary"></i></div>`;
        
        let albumData = AppState.library.find(a => a.id === mbid) || (AppState.loopPick?.id === mbid ? AppState.loopPick : null);
        if (!albumData) {
            try {
                albumData = await this.fetchAlbumData(mbid, title, artist, year, defCover);
            } catch(e) { tl.innerHTML = `<div class="text-red-600 dark:text-red-400 text-center p-4">${t('error_loading')}</div>`; return; }
        }
        AppState.currentModalAlbum = structuredClone(albumData); this.editingTrack = this.firstUnratedTrack(AppState.currentModalAlbum);
        this.updateModalUI();
    },

    // Albüm bilgisi ve parça listesi: MusicBrainz + Deezer (kapak, eksik parça/tür/şirket bilgisi)
    async fetchAlbumData(id, title, artist, year, defCover = null) {
        const hint = this._searchItems?.get(id) || {};
        const d = await MusicSource.details(id, { title, artist, deezerId: hint.deezerId });
        const cover = d.cover || defCover || (MusicSource.isMbid(id) ? `https://coverartarchive.org/release-group/${id}/front-500` : '');
        const yr = d.year || year || '';
        return {
            id, title: title || d.title || t('unknown'), artist: artist || d.artist || t('unknown'),
            year: yr || t('unknown'),
            label: d.label || t('unknown'),
            coverUrl: cover,
            tracks: d.tracks.length ? d.tracks : [{ id: '1', title: t('no_tracks'), number: '1', rating: 0 }],
            genres: d.genres || [], tags: [], listens: [], status: 'listening',
            dateAdded: new Date().toISOString(), averageScore: 0,
            source: d.source,
            ...(d.deezerId ? { deezerId: String(d.deezerId) } : {})
        };
    },

    // Arama sonucundan doğrudan "Dinlenecekler"e ekler
    async addToQueue(mbid, title, artist, year, coverUrl, btn) {
        if (!auth.currentUser) { showToast(t('login_empty_desc'), "error"); return; }
        if (AppState.library.some(a => a.id === mbid)) return;
        if (btn) { btn.disabled = true; btn.innerHTML = `<i class="ph-bold ph-spinner animate-spin"></i>`; }
        try {
            const album = await this.fetchAlbumData(mbid, title, artist, year, coverUrl);
            album.status = 'planned';
            album.updatedAt = album.dateAdded;
            AppState.library.unshift(album);
            await this.saveAlbumData(album);
            showToast(t('added_to_queue'), "success");
            if (btn) btn.outerHTML = `<span class="mt-2 self-start text-[11px] bg-primary/10 text-[#a85a1a] dark:text-primary px-2 py-1 rounded font-bold flex items-center gap-1"><i class="ph-fill ph-check-circle"></i> ${t('in_queue')}</span>`;
        } catch (e) {
            showToast(t('toast_conn_error'), "error");
            if (btn) { btn.disabled = false; btn.innerHTML = `<i class="ph-bold ph-clock-countdown"></i> ${t('listen_later')}`; }
        }
    },

        closeModal(fromHistory = false) {
        const modal = document.getElementById('album-modal');
        if (!modal || modal.classList.contains('hidden')) return; this.saveScrub(false);
        if (!fromHistory && history.state?.raModal) { this._skipPop = true; history.back(); }
        const content = modal.querySelector('.modal-content');
        modal.classList.add('opacity-0');
        if (content) {
            content.classList.remove('scale-100', 'opacity-100');
            content.classList.add('scale-95', 'opacity-0');
        }
        clearTimeout(this._closeTimer);
        this._closeTimer = setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            AppState.currentModalAlbum = null;
        }, 300);
    },

    updateModalUI() { this.updateShelfButton(); this.updateLoopButton(); if (this._reviewMode) this.renderReviewPanel();
        const al = AppState.currentModalAlbum;
        if(!al) return;

        const setElText = (id, text) => { const el = document.getElementById(id); if(el) el.textContent = text; };

        setElText('modal-title', al.title);
        setElText('modal-artist', al.artist);
        setElText('modal-date', al.year);
        setElText('modal-label', al.label);

        // Künye: "DİNLEME NOTLARI № 97 · 5 Kasım 2026" (№ = kitaplığa eklenme sırası)
        const sorted = AppState.library.slice().sort((a, b) => new Date(a.dateAdded || 0) - new Date(b.dateAdded || 0));
        const pos = sorted.findIndex(a => a.id === al.id);
        const issueNo = pos === -1 ? AppState.library.length + 1 : pos + 1;
        const lang = AppState.language === 'en' ? 'en-US' : 'tr-TR';
        const issueEl = document.getElementById('modal-issue');
        if (issueEl) issueEl.innerHTML = `<span class="hidden md:inline">RATEAGAINST · ${Utils.escapeHTML(t('issue_label').toLocaleUpperCase(lang))} </span>№ ${issueNo} · ${Utils.escapeHTML(Utils.formatDate(al.updatedAt || al.dateAdded).toLocaleUpperCase(lang))}`;

        const artistEl = document.getElementById('modal-artist');
        if (artistEl) {
            if (!this.isEditMode) {
                artistEl.classList.add('cursor-pointer', 'hover:underline');
                artistEl.onclick = () => app.searchFromLink(artistEl.textContent);
            } else {
                artistEl.classList.remove('cursor-pointer', 'hover:underline');
                artistEl.onclick = null;
            }
        }

        this.renderDateAdded();
        this.updateAlbumNoteIcon();

        const cov = document.getElementById('modal-cover');
        if(cov) {
            cov.dataset.fb = '0'; cov.dataset.orig = ''; cov.dataset.coverId = al.id;
            cov.onerror = () => app.coverFallback(cov);
            cov.src = AlbumUtils.coverSrc(al);
        }

        this.renderTracklist(); this.renderGenres(); this.calculateAverageScore();
        this.renderModalStatus(); this.renderModalTags(); this.renderListenLog();
        this.updateModalButtons();
        requestAnimationFrame(() => this.scrollSelectedTrackIntoView(true));
    },

    // --- Dinleme durumu (Dinlenecek / Dinliyorum / Bitti) ---
    renderModalStatus() {
        const al = AppState.currentModalAlbum;
        if (!al) return;
        const current = AlbumUtils.status(al);
        const html = [['planned', t('status_planned')], ['listening', t('status_listening')], ['done', t('status_done')]].map(([val, label]) => {
            const on = current === val;
            return `<button role="radio" aria-checked="${on}" onclick="app.setAlbumStatus('${val}')" class="flex-1 h-10 rounded-lg text-xs font-bold transition-colors ${on ? 'bg-primary text-darker' : 'text-gray-700 dark:text-gray-300 hover:bg-lightHighlight dark:hover:bg-surfaceHover'}">${label}</button>`;
        }).join('');
        document.querySelectorAll('#album-modal .modal-status-group').forEach(box => { box.innerHTML = html; });
    },

    setAlbumStatus(status) {
        const al = AppState.currentModalAlbum;
        if (!al) return;
        al.status = status;
        this.renderModalStatus();
        this.persistIfSaved();
        this.updateModalButtons();
    },

    // --- Kişisel etiketler ---
    renderModalTags() {
        const box = document.getElementById('modal-tags');
        const al = AppState.currentModalAlbum;
        if (!box || !al) return;
        const tags = al.tags || [];
        box.innerHTML = tags.map((tg, i) => `
            <span class="pl-2 pr-1 h-7 rounded-lg bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-200 text-[11px] font-bold flex items-center gap-1">
                #${Utils.escapeHTML(tg)}
                <button onclick="app.removeTag(${i})" aria-label="${Utils.escapeHTML(tg)} — ${t('remove')}" class="w-6 h-6 rounded flex items-center justify-center hover:bg-purple-200 dark:hover:bg-purple-500/30"><i class="ph-bold ph-x text-[11px]"></i></button>
            </span>`).join('') +
            `<button onclick="app.addTag()" class="h-7 px-2.5 rounded-lg border border-dashed border-gray-400 dark:border-gray-600 text-[11px] font-bold text-gray-700 dark:text-gray-300 hover:bg-lightHighlight dark:hover:bg-surfaceHover">${t('tags_add')}</button>`;
    },

    addTag() {
        const al = AppState.currentModalAlbum;
        if (!al) return;
        const input = prompt(t('tag_prompt'));
        if (!input) return;
        if (!al.tags) al.tags = [];
        input.split(',').map(s => s.trim().replace(/^#/, '').toLowerCase()).filter(Boolean).forEach(tg => {
            if (!al.tags.includes(tg) && al.tags.length < 8) al.tags.push(tg.slice(0, 24));
        });
        this.renderModalTags();
        this.persistIfSaved();
        this.updateModalButtons();
    },

    removeTag(i) {
        const al = AppState.currentModalAlbum;
        if (!al?.tags) return;
        al.tags.splice(i, 1);
        this.renderModalTags();
        this.persistIfSaved();
        this.updateModalButtons();
    },

    // --- Dinleme kaydı: her kayıt o günkü ortalamayı saklar ---
    renderListenLog() {
        const box = document.getElementById('listen-log');
        const countEl = document.getElementById('listen-count');
        const al = AppState.currentModalAlbum;
        if (!box || !al) return;
        const listens = (al.listens || []).slice().sort((a, b) => a.date.localeCompare(b.date));
        if (countEl) countEl.textContent = listens.length ? `· ${listens.length} ${t('times')}` : '';
        if (!listens.length) {
            box.innerHTML = `<p class="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">${t('no_listens')}</p>`;
            return;
        }
        const shown = listens.slice(-6);
        box.innerHTML = shown.map((l, i) => {
            const isLast = i === shown.length - 1;
            const h = l.score > 0 ? Math.max(8, Math.round((l.score / 5) * 32)) : 6;
            const label = Utils.formatDate(l.date, { month: 'short', year: '2-digit' });
            const realIdx = (al.listens || []).indexOf(l);
            return `<button onclick="app.deleteListen(${realIdx})" title="${t('delete_listen')}" aria-label="${label}: ${l.score > 0 ? l.score.toFixed(1) : '-'} — ${t('delete_listen')}" class="flex-1 min-w-0 max-w-[56px] flex flex-col items-center gap-1 group">
                <span class="w-full rounded-t-md rounded-b-sm ${isLast ? 'bg-primary' : 'bg-[#c9a68a] dark:bg-[#6b4a33]'} group-hover:opacity-70 transition-opacity" style="height:${h}px"></span>
                <span class="text-[11px] text-gray-600 dark:text-gray-400 whitespace-nowrap">${label}</span>
                <span class="text-xs font-bold ${isLast ? 'text-[#a85a1a] dark:text-primary' : 'text-gray-900 dark:text-white'}">${l.score > 0 ? l.score.toFixed(1) : '-'}</span>
            </button>`;
        }).join('');
    },

    logListen() {
        const al = AppState.currentModalAlbum;
        if (!al) return;
        if (!al.listens) al.listens = [];
        al.listens.push({ date: Utils.todayISO(), score: AlbumUtils.runningAvg(al) });
        if (AlbumUtils.status(al) === 'planned') al.status = 'listening';
        this.renderListenLog();
        this.renderModalStatus();
        this.persistIfSaved();
        this.updateModalButtons();
        showToast(t('listen_logged'), "success");
    },

    deleteListen(idx) {
        const al = AppState.currentModalAlbum;
        if (!al?.listens?.[idx]) return;
        if (!confirm(t('delete_listen') + '?')) return;
        al.listens.splice(idx, 1);
        this.renderListenLog();
        this.persistIfSaved();
        this.updateModalButtons();
    },

    // --- İnceleme (blog yazısı) görünümü ---
    // --- Masaüstü: inceleme albüm panelinin içinde açılır (kart boyutu değişmez) ---
    isWideModal() { return window.matchMedia('(min-width: 768px)').matches; },

    setModalReview(on) {
        const content = document.querySelector('#album-modal .modal-content');
        const body = document.getElementById('modal-body');
        if (!content || !body) return;
        this._reviewMode = !!on;
        let panel = document.getElementById('modal-review');
        if (on && !panel) {
            panel = document.createElement('section');
            panel.id = 'modal-review';
            panel.setAttribute('aria-labelledby', 'modal-review-title');
            body.appendChild(panel);
        }
        if (on && !document.getElementById('modal-meta')) {
            const meta = document.createElement('div');
            meta.id = 'modal-meta';
            body.appendChild(meta);
        }
        content.classList.toggle('is-review', !!on);
        if (on) { this.renderReviewPanel(); panel.scrollTop = 0; }
        const btn = document.getElementById('review-btn');
        if (btn) { const txt = on ? t('back_to_tracks') : t('open_review'); btn.setAttribute('aria-label', txt); const lb = document.getElementById('review-btn-label'); if (lb) lb.textContent = txt; else btn.textContent = txt; }
    },

        renderReviewPanel() {
        const al = AppState.currentModalAlbum;
        const panel = document.getElementById('modal-review');
        const meta = document.getElementById('modal-meta');
        if (!al || !panel) return;
        // Parçalar 13'e kadar kaydırmadan sığacak şekilde ölçeklenir
        document.getElementById('modal-body')?.style.setProperty('--rows', Math.min(Math.max((al.tracks || []).length, 1), 13));
        const listens = (al.listens || []).length;
        const lastDate = al.listens?.length ? al.listens[al.listens.length - 1].date : (al.updatedAt || al.dateAdded);
        const paragraphs = AlbumUtils.noteParagraphs(al.note);
        const favs = (al.tracks || []).filter(tr => tr.rating >= 4).sort((a, b) => b.rating - a.rating || parseInt(a.number) - parseInt(b.number));
        const trackNotes = (al.tracks || []).filter(tr => tr.note && tr.note.trim());
        const avg = al.averageScore || AlbumUtils.runningAvg(al);
        const complete = (al.averageScore || 0) > 0;
        const label = al.label && al.label !== t('unknown') ? al.label : '';
        const iconBtn = 'w-8 h-8 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-lightHighlight dark:hover:bg-surface transition-colors';
        // Künye: sol sütunda, kapağın altında (başlıktaki oranlar korunur)
        if (meta) meta.innerHTML = `
            <span role="img" aria-label="${t('album_avg')}: ${avg > 0 ? avg.toFixed(1) : '–'}" class="score-badge ${complete ? '' : 'is-partial'} flex-shrink-0 w-[54px] h-[54px] rounded-full flex items-center justify-center -rotate-[8deg] text-[19px] font-black ${AlbumUtils.tier(avg).text}">${avg > 0 ? avg.toFixed(1) : '–'}</span>
            <div class="min-w-0">
                <p class="text-[23px] font-black italic leading-[1.05] tracking-tight text-gray-900 dark:text-white truncate" title="${Utils.escapeHTML(al.title)}">${Utils.escapeHTML(al.title)}</p>
                <p class="mt-0.5 text-[15px] text-gray-700 dark:text-gray-300 flex items-baseline gap-x-1.5 min-w-0 whitespace-nowrap">
                    <span class="truncate">${Utils.escapeHTML(al.artist)}</span>
                    <span class="text-[#a85a1a] dark:text-[#e8955a]" aria-hidden="true">·</span>
                    <span class="text-[0.75em] flex-shrink-0">${Utils.escapeHTML(al.year)}</span>
                    ${label ? `<span class="text-[#a85a1a] dark:text-[#e8955a]" aria-hidden="true">·</span><span class="text-[0.5em] tracking-wide truncate">${Utils.escapeHTML(label)}</span>` : ''}
                </p>
            </div>`;
        panel.innerHTML = `
            <div class="flex justify-between items-center gap-3 pb-1.5 border-b border-[#c9b8a6] dark:border-[#4a3829] flex-shrink-0">
                <h3 id="modal-review-title" class="text-xs tracking-[0.2em] font-bold uppercase truncate">${t('review_label')} <span class="normal-case tracking-normal font-normal text-gray-600 dark:text-gray-400">· ${Utils.formatDate(lastDate)}${listens ? ` · ${listens}. ${t('nth_listen').toLocaleLowerCase(AppState.language === 'en' ? 'en-US' : 'tr-TR')}` : ''}</span></h3>
                <div class="flex items-center gap-1 flex-shrink-0">
                    <button onclick="app.editReviewNote()" class="${iconBtn}" aria-label="${t('edit')}" title="${t('edit')}"><i class="ph-bold ph-pencil-simple"></i></button>
                    <button onclick="app.copyReviewMarkdown()" class="${iconBtn}" aria-label="${t('copy_markdown')}" title="${t('copy_markdown')}"><i class="ph-bold ph-copy"></i></button>
                    <button onclick="app.setModalReview(false)" class="${iconBtn}" aria-label="${t('back_to_tracks')}" title="${t('back_to_tracks')}"><i class="ph-bold ph-x"></i></button>
                </div>
            </div>
            <article class="review-scroll flex-1 min-h-0 overflow-y-auto pt-4 pr-2 flex flex-col gap-4">
                <div class="flex flex-col gap-4 text-[16px] leading-[1.85] text-gray-900 dark:text-gray-100">
                    ${paragraphs.length ? paragraphs.map(p => `<p>${Utils.escapeHTML(p)}</p>`).join('') : `<p class="italic text-gray-600 dark:text-gray-400">${t('review_empty')}</p>`}
                </div>
                ${favs.length ? `<section class="pt-3 border-t border-[#c9b8a6] dark:border-[#4a3829] flex flex-col gap-2">
                    <h4 class="text-[11px] font-bold tracking-[0.2em] text-gray-600 dark:text-gray-400">${t('favorite_tracks').toUpperCase()}</h4>
                    ${favs.map(tr => `<div class="flex justify-between items-center gap-3"><span class="italic text-gray-900 dark:text-white truncate">${Utils.escapeHTML(tr.title)}</span><span class="text-sm font-black ${AlbumUtils.tier(tr.rating).text} flex-shrink-0">${tr.rating.toFixed(1)}</span></div>`).join('')}
                </section>` : ''}
                ${trackNotes.length ? `<section class="pt-3 pb-2 border-t border-[#c9b8a6] dark:border-[#4a3829] flex flex-col gap-3">
                    <h4 class="text-[11px] font-bold tracking-[0.2em] text-gray-600 dark:text-gray-400">${t('track_notes').toUpperCase()}</h4>
                    ${trackNotes.map(tr => `<div class="pl-3 border-l-[3px] border-[#a85a1a] dark:border-[#e8955a]"><p class="font-bold italic text-gray-900 dark:text-white mb-1">${Utils.escapeHTML(tr.number)}. ${Utils.escapeHTML(tr.title)}</p>${AlbumUtils.noteParagraphs(tr.note).map(p => `<p class="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">${Utils.escapeHTML(p)}</p>`).join('')}</div>`).join('')}
                </section>` : ''}
            </article>`;
    },

    openReview() {
        if (!AppState.currentModalAlbum) return;
        if (this.isWideModal()) { this.setModalReview(!this._reviewMode); return; }
        this.renderReview();
        const view = document.getElementById('review-view');
        view?.classList.remove('hidden');
        if (view) view.scrollTop = 0;
        view?.querySelector('button')?.focus();
    },

    closeReview() {
        document.getElementById('review-view')?.classList.add('hidden');
    },

    editReviewNote() {
        this.closeReview();
        this.openNotePanel('album');
        this.setNoteEditMode(true);
    },

    renderReview() {
        const al = AppState.currentModalAlbum;
        const box = document.getElementById('review-content');
        if (!al || !box) return;
        const avg = al.averageScore || AlbumUtils.runningAvg(al);
        const tier = AlbumUtils.tier(avg);
        const listens = (al.listens || []).length;
        const lastDate = al.listens?.length ? al.listens[al.listens.length - 1].date : (al.updatedAt || al.dateAdded);
        const paragraphs = AlbumUtils.noteParagraphs(al.note);
        const favs = (al.tracks || []).filter(tr => tr.rating >= 4).sort((a, b) => b.rating - a.rating || parseInt(a.number) - parseInt(b.number));
        const trackNotes = (al.tracks || []).filter(tr => tr.note && tr.note.trim());

                const complete = (al.averageScore || 0) > 0;
        const label = al.label && al.label !== t('unknown') ? al.label : '';
        // Üst şerit: inceleme tarihi (geri okunun yanında)
        const dateEl = document.getElementById('review-date');
        if (dateEl) dateEl.innerHTML = `${t('review_label')} <span class="normal-case tracking-normal font-normal text-gray-600 dark:text-gray-400">· ${Utils.formatDate(lastDate)}${listens ? ` · ${listens}. ${t('nth_listen').toLocaleLowerCase(AppState.language === 'en' ? 'en-US' : 'tr-TR')}` : ''}</span>`;

        box.innerHTML = `
            <div class="flex items-center gap-3.5">
                <img ${AlbumUtils.coverAttrs(al)} alt="" class="w-[88px] h-[88px] md:w-32 md:h-32 rounded-xl object-cover shadow-lg flex-shrink-0">
                <header class="flex-1 min-w-0 flex flex-col gap-1">
                    <h1 id="review-title" class="text-[24px] md:text-4xl font-black italic leading-[1.1] tracking-tight text-gray-900 dark:text-white line-clamp-2 break-words">${Utils.escapeHTML(al.title)}</h1>
                    <p class="text-[15px] md:text-lg text-gray-700 dark:text-gray-300 flex flex-wrap items-baseline gap-x-1.5">
                        <span>${Utils.escapeHTML(al.artist)}</span>
                        <span class="text-[#a85a1a] dark:text-[#e8955a]" aria-hidden="true">·</span>
                        <span class="text-[0.75em]">${Utils.escapeHTML(al.year)}</span>
                        ${label ? `<span class="text-[#a85a1a] dark:text-[#e8955a]" aria-hidden="true">·</span><span class="text-[0.5em] tracking-wide">${Utils.escapeHTML(label)}</span>` : ''}
                    </p>
                </header>
                <span role="img" aria-label="${t('album_avg')}: ${avg > 0 ? avg.toFixed(1) : '–'}" class="score-badge ${complete ? '' : 'is-partial'} flex-shrink-0 w-[60px] h-[60px] rounded-full flex items-center justify-center -rotate-[8deg] text-[20px] font-black ${tier.text}">${avg > 0 ? avg.toFixed(1) : '–'}</span>
            </div>
            ${(al.tags || []).length || (al.genres || []).length ? `<div class="flex flex-wrap gap-1.5">
                ${(al.genres || []).map(g => `<span class="px-2.5 py-1 rounded-lg bg-lightHighlight dark:bg-surface text-[11px] font-bold text-gray-700 dark:text-gray-300">${Utils.escapeHTML(tGenre(g))}</span>`).join('')}
                ${(al.tags || []).map(tg => `<span class="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-800 dark:bg-purple-500/20 dark:text-purple-200 text-[11px] font-bold">#${Utils.escapeHTML(tg)}</span>`).join('')}
            </div>` : ''}
            <hr class="border-lightBorder dark:border-gray-800">
            <div class="flex flex-col gap-4 text-[17px] leading-[1.8] text-gray-900 dark:text-gray-100">
                ${paragraphs.length ? paragraphs.map(p => `<p>${Utils.escapeHTML(p)}</p>`).join('') : `<p class="text-base italic text-gray-600 dark:text-gray-400">${t('review_empty')}</p>`}
            </div>
            ${favs.length ? `<section class="p-4 rounded-2xl bg-white dark:bg-surface border border-lightBorder dark:border-gray-800 flex flex-col gap-2.5">
                <h2 class="text-[11px] font-black tracking-widest text-gray-600 dark:text-gray-400">${t('favorite_tracks').toUpperCase()}</h2>
                ${favs.map(tr => `<div class="flex justify-between items-center gap-3"><span class="font-bold italic text-gray-900 dark:text-white truncate">${Utils.escapeHTML(tr.title)}</span><span class="text-sm font-black ${AlbumUtils.tier(tr.rating).text} flex-shrink-0">${tr.rating} ★</span></div>`).join('')}
            </section>` : ''}
            ${trackNotes.length ? `<section class="flex flex-col gap-3">
                <h2 class="text-[11px] font-black tracking-widest text-gray-600 dark:text-gray-400">${t('track_notes').toUpperCase()}</h2>
                ${trackNotes.map(tr => `<div class="pl-4 border-l-2 border-primary/50"><p class="font-bold italic text-gray-900 dark:text-white mb-1">${Utils.escapeHTML(tr.number)}. ${Utils.escapeHTML(tr.title)}</p>${AlbumUtils.noteParagraphs(tr.note).map(p => `<p class="text-base leading-relaxed text-gray-700 dark:text-gray-300">${Utils.escapeHTML(p)}</p>`).join('')}</div>`).join('')}
            </section>` : ''}
        `;
    },

    copyReviewMarkdown() {
        const al = AppState.currentModalAlbum;
        if (!al) return;
        const md = this.albumToMarkdown(al);
        (navigator.clipboard ? navigator.clipboard.writeText(md) : Promise.reject())
            .then(() => showToast(t("toast_copied"), "success"))
            .catch(() => this.fallbackCopyText(md));
    },

    renderDateAdded() {
        const al = AppState.currentModalAlbum;
        if (!al) return;
        const d = new Date(al.dateAdded);
        const isValid = !isNaN(d.getTime());
        const formattedDate = isValid ? d.toLocaleDateString(AppState.language === 'en' ? 'en-US' : 'tr-TR') : '-';
        const isoDate = isValid ? d.toISOString().split('T')[0] : '';

        document.getElementById('modal-date-added-row')?.classList.toggle('hidden', !this.isEditMode); const dateAddedContainer = document.getElementById('modal-date-added-container');
        if (dateAddedContainer) {
            if (this.isEditMode) {
                dateAddedContainer.innerHTML = `
                    <div class="relative flex items-center gap-1.5 cursor-pointer bg-lightHighlight dark:bg-darker border border-dashed border-primary px-1.5 py-0.5 rounded active:scale-95 transition-transform w-fit" onclick="document.getElementById('added-date-picker').showPicker()">
                        <span class="text-[11px] font-bold text-gray-800 dark:text-gray-200">${formattedDate}</span>
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
        document.querySelector('#album-modal .modal-content')?.classList.toggle('is-editing', this.isEditMode);
        const btn = document.getElementById('edit-mode-btn');
        const aBtn = document.getElementById('auto-fetch-genre-btn');
        
        if(this.isEditMode) { 
            btn?.classList.add('bg-primary/20', 'text-primary'); 
            aBtn?.classList.remove('hidden'); 
        } else { 
            btn?.classList.remove('bg-primary/20', 'text-primary'); 
            aBtn?.classList.add('hidden'); 
        }
        
        ['modal-title', 'modal-artist', 'modal-date', 'modal-label'].forEach(id => {
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
        if(curl) { const u = AppState.currentModalAlbum.customCoverUrl || AppState.currentModalAlbum.coverUrl || ''; curl.value = u.startsWith('data:') ? '' : u; } 
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
    
    // Bilgisayardan kapak yükle: kare kırpılıp en fazla 600 px'e küçültülür, albümle birlikte kaydedilir
    async uploadCover(e) {
        const input = e.target, file = input.files?.[0];
        input.value = '';
        if (!file || !AppState.currentModalAlbum) return;
        if (!file.type.startsWith('image/')) { showToast(t('upload_not_image'), 'error'); return; }
        try {
            const bmp = await createImageBitmap(file);
            const side = Math.min(bmp.width, bmp.height), size = Math.min(600, side);
            const canvas = document.createElement('canvas');
            canvas.width = canvas.height = size;
            canvas.getContext('2d').drawImage(bmp, (bmp.width - side) / 2, (bmp.height - side) / 2, side, side, 0, 0, size, size);
            bmp.close?.();
            AppState.currentModalAlbum.customCoverUrl = canvas.toDataURL('image/jpeg', 0.85);
            const urlInput = document.getElementById('custom-cover-url'); if (urlInput) urlInput.value = '';
            this.updateModalUI();
            this.renderCoverOptions();
            showToast(t('cover_selected'), 'success');
        } catch (err) { showToast(t('upload_not_image'), 'error'); }
    },

    // Kapak bul: Deezer, MusicBrainz ve iTunes'tan seçenekleri toplar, aralarından seçtirir
    async findCover() {
        const al = AppState.currentModalAlbum, btn = document.getElementById('find-cover-btn'), box = document.getElementById('cover-options');
        if (!al || !btn || !box) return;
        const oH = btn.innerHTML; btn.innerHTML = `<i class="ph-bold ph-spinner animate-spin"></i>`;
        box.classList.remove('hidden');
        box.innerHTML = Array.from({ length: 6 }, () => `<div class="skeleton aspect-square rounded-lg" aria-hidden="true"></div>`).join('');

        const opts = [];
        const add = (full, thumb, src) => { if (full && !opts.some(o => o.full === full)) opts.push({ full, thumb: thumb || full, src }); };
        const nt = MusicSource.norm(al.title), na = MusicSource.norm(al.artist);
        const near = (a, b) => a && b && (a === b || a.includes(b) || b.includes(a));
        const found = { deezer: [], mb: [], itunes: [] };

        await Promise.allSettled([
            (async () => {
                const res = await Net.deezer(`search/album?q=${encodeURIComponent(`${al.artist} ${al.title}`)}&limit=25`);
                found.deezer = (res.data || []).filter(d => near(MusicSource.norm(d.title), nt) && near(MusicSource.norm(d.artist?.name), na)).slice(0, 8);
            })(),
            (async () => {
                if (MusicSource.isMbid(al.id)) found.mb = [al.id];
            })(),
            (async () => {
                const list = await Net.itunes(`${al.artist} ${al.title}`);
                found.itunes = list.filter(r => near(MusicSource.norm(r.collectionName), nt)).slice(0, 4);
            })()
        ]);
        found.deezer.forEach(d => add(d.cover_xl || d.cover_big, d.cover_medium, 'Deezer'));
        found.mb.forEach(id => add(`https://coverartarchive.org/release-group/${id}/front-500`, `https://coverartarchive.org/release-group/${id}/front-250`, 'MusicBrainz'));
        found.itunes.forEach(r => r.artworkUrl100 && add(r.artworkUrl100.replace('100x100bb', '600x600bb'), r.artworkUrl100.replace('100x100bb', '250x250bb'), 'iTunes'));

        this._coverOptions = opts;
        this.renderCoverOptions();
        btn.innerHTML = oH;
    },

    renderCoverOptions() {
        const box = document.getElementById('cover-options');
        const al = AppState.currentModalAlbum;
        if (!box || !al) return;
        const opts = this._coverOptions || [];
        const cur = CoverCache.source(al);
        if (!opts.length) { box.innerHTML = `<p class="col-span-full text-xs text-gray-600 dark:text-gray-400">${t('toast_cover_not_found')}</p>`; return; }
        box.innerHTML = `<p class="col-span-full text-[11px] font-bold text-gray-700 dark:text-gray-300">${t('choose_cover')}</p>` + opts.map((o, i) => {
            const on = o.full === cur;
            return `<button type="button" onclick="app.pickCover(${i})" aria-pressed="${on}" aria-label="${t('choose_cover')}: ${o.src} ${i + 1}" class="flex flex-col gap-1 text-left min-w-0">
                <span class="relative block aspect-square overflow-hidden rounded-lg ring-2 ${on ? 'ring-primary' : 'ring-transparent hover:ring-primary/50'} transition">
                    <img src="${Utils.escapeHTML(o.thumb)}" alt="" loading="lazy" onerror="app.coverOptionError(this)" class="w-full h-full object-cover bg-lightHighlight dark:bg-dark">
                    ${on ? `<span class="absolute top-1 right-1 w-5 h-5 rounded-full bg-primary text-darker flex items-center justify-center"><i class="ph-bold ph-check text-[11px]"></i></span>` : ''}
                </span>
                <span class="text-[10px] font-bold text-gray-600 dark:text-gray-400 truncate">${o.src}</span>
            </button>`;
        }).join('');
    },

    // Seçenek görseli açılmazsa bir kez görsel vekiliyle dene, yine olmazsa seçeneği kaldır
    coverOptionError(img) {
        if (!img.dataset.proxied) { img.dataset.proxied = '1'; img.src = CoverCache.proxy(img.src, 300); return; }
        img.onerror = null;
        img.closest('button')?.remove();
    },

    pickCover(i) {
        const o = (this._coverOptions || [])[i];
        if (!o || !AppState.currentModalAlbum) return;
        AppState.currentModalAlbum.customCoverUrl = o.full;
        const urlInput = document.getElementById('custom-cover-url'); if (urlInput) urlInput.value = o.full;
        this.updateModalUI();
        this.renderCoverOptions();
        showToast(t('cover_selected'), "success");
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
            tag.className = `px-2 py-1 bg-lightBorder dark:bg-darker rounded-lg text-[11px] font-bold flex items-center gap-1 ${!this.isEditMode ? 'active:scale-95 cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors' : 'cursor-grab active:cursor-grabbing'}`;
            if(!this.isEditMode) { 
                tag.innerHTML = Utils.escapeHTML(displayG); 
                tag.onclick = (e) => { e.stopPropagation(); this.filterByGenre(g); }; 
            }
            else { 
                tag.innerHTML = `<i class="ph-bold ph-dots-six-vertical text-gray-600 dark:text-gray-400 mr-0.5"></i> ${Utils.escapeHTML(displayG)} <i class="ph-bold ph-x ml-1 cursor-pointer hover:text-red-500 p-0.5" onclick="app.removeGenre(${i})"></i>`; 
                
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
            const add = document.createElement('button'); add.className = 'px-2 py-1 bg-primary/20 text-primary rounded-lg text-[11px] font-bold flex items-center hover:bg-primary/30 transition-colors cursor-pointer';
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
            // Tür: MusicBrainz → Deezer → iTunes (son yedek)
            let foundGenres = [];
            if (MusicSource.isMbid(al.id)) {
                try { const rg = await Net.mb(`release-group/${al.id}?inc=genres`); foundGenres = MusicSource.pickGenres(rg.genres); } catch (e) {}
            }
            if (foundGenres.length === 0) {
                try {
                    const dzId = al.deezerId || (await MusicSource.dzMatch(al.artist, al.title))?.id;
                    if (dzId) { const dz = await Net.deezer(`album/${dzId}`); foundGenres = (dz.genres?.data || []).map(g => g.name); }
                } catch (e) {}
            }
            if (foundGenres.length === 0) {
                try { const list = await Net.itunes(`${al.artist} ${al.title}`); if (list[0]?.primaryGenreName) foundGenres = [list[0].primaryGenreName]; } catch (e) {}
            }

            if (foundGenres.length > 0) {
                if(!al.genres) al.genres = [];
                let added = 0;
                
                foundGenres.forEach(g => {
                    const formatted = tGenre(g);
                    if (!al.genres.some(x => Genre.same(x, formatted)) && al.genres.length < 3) {
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
            let formatted = tGenre(g);
            if(!AppState.currentModalAlbum.genres.some(x => Genre.same(x, formatted)) && AppState.currentModalAlbum.genres.length < 3) {
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
        
        this.persistIfSaved();
        this.updateModalButtons();

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
            <img ${AlbumUtils.coverAttrs(album)} alt="" class="w-16 h-16 rounded-xl shadow-md object-cover border border-lightBorder dark:border-gray-800 flex-shrink-0">
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
                    <i class="ph-bold ph-music-notes text-gray-600 dark:text-gray-400 text-lg"></i>
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

    // Not ikonu + sol sütundaki alıntı
    updateAlbumNoteIcon() {
        const al = AppState.currentModalAlbum;
        if (!al) return;
        const hasNote = !!(al.note && al.note.trim());
        const btn = document.getElementById('album-note-btn');
        if (btn) {
            btn.classList.toggle('text-[#a85a1a]', hasNote);
            btn.classList.toggle('dark:text-primary', hasNote);
            btn.innerHTML = `<i class="ph-${hasNote ? 'fill' : 'bold'} ph-paperclip text-lg"></i>`;
        }
        const quote = document.getElementById('modal-quote');
        if (quote) {
            const first = AlbumUtils.noteParagraphs(al.note)[0];
            quote.innerHTML = first
                ? `“${Utils.escapeHTML(first.length > 180 ? first.slice(0, 177) + '…' : first)}”`
                : `<span class="not-italic text-sm text-gray-600 dark:text-gray-400">${t('quote_placeholder')}</span>`;
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
        const on = 'w-8 h-8 rounded-full flex items-center justify-center bg-primary/15 text-[#a85a1a] dark:text-[#e8955a]';
        const off = 'w-8 h-8 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-lightHighlight dark:hover:bg-surface hover:text-gray-900 dark:hover:text-white transition-colors';
        const btnDef = document.getElementById('btn-track-sort-default');
        const btnRat = document.getElementById('btn-track-sort-rating');
        if (btnDef) { btnDef.className = mode === 'default' ? on : off; btnDef.setAttribute('aria-pressed', mode === 'default'); }
        if (btnRat) { btnRat.className = mode === 'rating' ? on : off; btnRat.setAttribute('aria-pressed', mode === 'rating'); }
    },

    getStarColorClass(rating) {
        return AlbumUtils.tier(rating).text;
    },

    // İlk puanlanmamış parça (modal açılınca o satır düzenlemeye hazır gelir)
    firstUnratedTrack(album) {
        const idx = (album?.tracks || []).findIndex(tr => !(tr.rating > 0));
        return idx === -1 ? null : idx;
    },

    renderTracklist() {
        const con = document.getElementById('modal-tracklist'), al = AppState.currentModalAlbum;
        if(!con || !al) return;
        // Telefonda parçalar 13'e kadar kaydırmadan sığacak şekilde ölçeklenir
        con.closest('.modal-content')?.style.setProperty('--m-rows', Math.min(Math.max((al.tracks || []).length, 1), 13));

        if (!al.tracks || al.tracks.length === 0) { con.innerHTML = `<p class="text-sm text-gray-600 dark:text-gray-400 py-4">${t('no_tracks')}</p>`; return; }

        let rows = al.tracks.map((tr, idx) => ({ ...tr, originalIndex: idx }));
        if (AppState.modalTrackSort === 'rating') {
            rows.sort((a, b) => (b.rating || 0) - (a.rating || 0) || parseInt(a.number || 0) - parseInt(b.number || 0));
        }

        const muted = 'text-gray-600 dark:text-gray-400';
        const starSvg = (cls) => `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" class="${cls}" role="img" aria-label="${t('perfect_score')}"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"></path></svg>`;

        let html = rows.map(tr => {
            const i = tr.originalIndex;
            const r = tr.rating || 0;
            const title = Utils.escapeHTML(tr.title);
            const num = Utils.escapeHTML(tr.number);
            const color = r > 0 ? AlbumUtils.tier(r).text : muted;
            const score = r > 0 ? r.toFixed(1) : '–';
            const perfect = r === 5 ? starSvg(color) : '';
            const hasNote = !!(tr.note && tr.note.trim());

            // Düzenleme modu: parça adı/numarası ve silme
            if (this.isEditMode) {
                return `<div class="flex items-center gap-2 py-1.5">
                    <input type="text" aria-label="#" value="${num}" onblur="app.updateTrackField(${i},'number',this.value)" class="w-10 h-10 text-xs text-center font-bold bg-white dark:bg-surface border border-lightBorder dark:border-gray-800 rounded-lg outline-none focus:border-primary text-gray-800 dark:text-gray-200">
                    <input type="text" aria-label="${t('tracklist')}" value="${title}" onblur="app.updateTrackField(${i},'title',this.value)" class="flex-1 min-w-0 h-10 px-3 text-sm italic font-bold bg-white dark:bg-surface border border-lightBorder dark:border-gray-800 rounded-lg outline-none focus:border-primary text-gray-800 dark:text-gray-200">
                    <button onclick="app.deleteTrack(${i})" aria-label="${title} — ${t('remove')}" class="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 flex items-center justify-center flex-shrink-0"><i class="ph-bold ph-trash"></i></button>
                </div>`;
            }

            // Seçili satır: puan kaydırıcı + kaydet (✓)
            if (this.editingTrack === i) {
                return `<div data-selected class="h-[52px] md:h-10 my-0.5 -mx-2 px-2 flex items-center gap-2 rounded-xl bg-[#ebe2d3] dark:bg-[#2a1f17]">
                    <span class="w-5 text-xs font-bold ${muted} flex-shrink-0">${num}</span>
                    <span class="flex-1 min-w-0 truncate text-[15px] italic font-bold">${title}</span>
                    <button onclick="app.openNotePanel('track', ${i})" aria-label="${t('track_note')}" class="w-10 h-10 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${hasNote ? 'text-[#a85a1a] dark:text-primary' : muted} hover:bg-black/5 dark:hover:bg-white/5"><i class="ph-${hasNote ? 'fill' : 'bold'} ph-paperclip"></i></button>
                    <div data-scrub data-idx="${i}" role="slider" tabindex="0" aria-label="${title}" aria-valuemin="0" aria-valuemax="5" aria-valuenow="${r}" aria-valuetext="${score}" title="${t('scrub_hint')}" class="score-scrub ${color}">
                        <i class="ph-bold ph-caret-up scrub-caret" aria-hidden="true"></i>
                        <span data-scrub-val class="text-base md:text-[17px] font-black leading-none">${score}</span>
                        <i class="ph-bold ph-caret-down scrub-caret" aria-hidden="true"></i>
                        <span data-ghost-up class="scrub-ghost scrub-ghost-up" aria-hidden="true"></span>
                        <span data-ghost-down class="scrub-ghost scrub-ghost-down" aria-hidden="true"></span>
                    </div>
                    <button type="button" data-scrub-save onmousedown="event.preventDefault()" onclick="app.saveScrub(true)" aria-label="${t('save_rating')}" title="${t('save_rating')} (Enter)" class="scrub-save"><i class="ph-bold ph-check"></i></button>
                     
                </div>`;
            }

            // Normal satır: noktalı çizgiyle puana bağlanan dergi listesi
            return `<button type="button" onclick="app.selectTrack(${i})" data-track="${i}"${r === 5 ? ' data-perfect' : ''} aria-label="${title}: ${score} — ${t('tap_to_rate')}" class="w-full h-11 md:h-[34px] flex items-center gap-2.5 text-left rounded-lg -mx-1 px-1 hover:bg-[#ebe2d3]/70 dark:hover:bg-[#2a1f17]/70 transition-colors">
                <span class="w-5 text-xs font-bold ${muted} flex-shrink-0">${num}</span>
                <span class="min-w-0 truncate text-[15px] italic">${title}</span>
                ${hasNote ? `<i class="ph-fill ph-paperclip text-xs text-[#a85a1a] dark:text-primary flex-shrink-0" aria-hidden="true"></i>` : ''}
                <span class="flex-1 min-w-[12px] border-b-2 border-dotted border-[#c9b8a6] dark:border-[#4a3829] translate-y-1" aria-hidden="true"></span>
                <span class="w-8 text-right text-base font-black ${color} flex-shrink-0">${score}</span>
                 
            </button>`;
        }).join('');

        if (this.isEditMode) {
            html += `<button onclick="app.addNewTrack()" class="w-full h-11 mt-2 border-2 border-dashed border-[#c9b8a6] dark:border-[#4a3829] rounded-xl text-gray-700 dark:text-gray-300 font-bold flex items-center justify-center gap-2 hover:bg-[#ebe2d3]/60 dark:hover:bg-[#2a1f17]/60"><i class="ph-bold ph-plus text-lg"></i> ${t('add_new_track')}</button>`;
        }

        con.innerHTML = html; this.bindScrub();
        const countEl = document.getElementById('modal-track-count');
        if (countEl) countEl.textContent = `· ${al.tracks.length}`;
        this.updateModalTrackSortButtons();
    },

    // Seçili parça, kayan listenin görünür alanında kalsın
    scrollSelectedTrackIntoView(fromTop = false) {
        const list = document.getElementById('modal-tracklist');
        if (!list) return;
        if (fromTop) list.scrollTop = 0;
        const row = list.querySelector('[data-selected]');
        if (!row || list.scrollHeight <= list.clientHeight) return;
        const top = row.offsetTop - list.offsetTop;
        if (top < list.scrollTop || top + row.offsetHeight > list.scrollTop + list.clientHeight) {
            list.scrollTop = Math.max(0, top - list.clientHeight / 3);
        }
    },

    // Satıra dokununca düzenlemeye aç/kapat
    selectTrack(i) {
        this.saveScrub(false); this.editingTrack = this.editingTrack === i ? null : i;
        this.renderTracklist();
        this.scrollSelectedTrackIntoView();
        this.focusScrub();
    },

        // --- Puan kaydırıcı: sürükle / tekerlek / ok tuşları ile seç, ✓ ya da Enter ile kaydet ---
    focusScrub() {
        document.querySelector('#modal-tracklist [data-scrub]')?.focus({ preventScroll: true });
    },

    paintScrub(el, v) {
        const fmt = (x) => x > 0 ? x.toFixed(1) : '–';
        el.querySelector('[data-scrub-val]').textContent = fmt(v);
        el.querySelector('[data-ghost-up]').textContent = v < 5 ? fmt(v + 0.5) : '';
        el.querySelector('[data-ghost-down]').textContent = v > 0 ? fmt(v - 0.5) : '';
        el.className = `score-scrub ${AlbumUtils.tier(v).text}${el.classList.contains('is-scrubbing') ? ' is-scrubbing' : ''}`;
        el.setAttribute('aria-valuenow', v);
        el.setAttribute('aria-valuetext', fmt(v));
        const dirty = !!this.scrub && v !== this.scrub.orig;
        document.querySelector('#modal-tracklist [data-scrub-save]')?.classList.toggle('is-dirty', dirty);
    },

    // Seçilen puanı kaydet; close=true ise satırı kapatıp listeye dön
    saveScrub(close = true) {
        const s = this.scrub;
        if (!s) return;
        clearTimeout(s.blurTimer);
        this.scrub = null;
        if (s.value !== s.orig) this.setTrackRating(s.idx, s.value);
        if (close) {
            this.editingTrack = null;
            this.renderTracklist();
            document.querySelector(`#modal-tracklist [data-track="${s.idx}"]`)?.focus({ preventScroll: true });
        }
    },

    // Esc: değişikliği bırak, satırı kapat
    cancelScrub() {
        const idx = this.scrub?.idx;
        this.scrub = null;
        this.editingTrack = null;
        this.renderTracklist();
        if (idx != null) document.querySelector(`#modal-tracklist [data-track="${idx}"]`)?.focus({ preventScroll: true });
    },

    bindScrub() {
        const el = document.querySelector('#modal-tracklist [data-scrub]');
        const al = AppState.currentModalAlbum;
        if (!el || !al) { this.scrub = null; return; }
        const idx = Number(el.dataset.idx);
        const orig = al.tracks[idx]?.rating || 0;
        const s = this.scrub = { idx, orig, value: orig, blurTimer: null };
        const STEP_PX = 14; // bu kadar piksel sürükleme = yarım puan
        const clamp = (v) => Math.min(5, Math.max(0, Math.round(v * 2) / 2));
        let startY = 0, startVal = 0, moved = false, wheelAcc = 0;

        const show = (v) => {
            v = clamp(v);
            if (v === s.value) return;
            s.value = v;
            this.paintScrub(el, v);
            navigator.vibrate?.(4);
        };

        this.paintScrub(el, orig);

        el.addEventListener('pointerdown', (e) => {
            if (e.button > 0) return;
            e.preventDefault();
            el.setPointerCapture(e.pointerId);
            startY = e.clientY; startVal = s.value; moved = false;
            el.classList.add('is-scrubbing');
            el.focus({ preventScroll: true });
        });
        el.addEventListener('pointermove', (e) => {
            if (!el.hasPointerCapture(e.pointerId)) return;
            const dy = startY - e.clientY;
            if (Math.abs(dy) > 5) moved = true;
            if (moved) show(startVal + Math.trunc(dy / STEP_PX) * 0.5);
        });
        el.addEventListener('pointerup', (e) => {
            el.classList.remove('is-scrubbing');
            // Sürüklemeden dokunma: üst yarı +0.5, alt yarı −0.5
            if (!moved) {
                const b = el.getBoundingClientRect();
                show(s.value + (e.clientY < b.top + b.height / 2 ? 0.5 : -0.5));
            }
        });
        el.addEventListener('pointercancel', () => el.classList.remove('is-scrubbing'));

        el.addEventListener('wheel', (e) => {
            e.preventDefault();
            wheelAcc += e.deltaY;
            if (Math.abs(wheelAcc) < 40) return;
            show(s.value + (wheelAcc < 0 ? 0.5 : -0.5));
            wheelAcc = 0;
        }, { passive: false });

        el.addEventListener('keydown', (e) => {
            const steps = { ArrowUp: 0.5, ArrowRight: 0.5, ArrowDown: -0.5, ArrowLeft: -0.5 };
            if (e.key in steps) show(s.value + steps[e.key]);
            else if (e.key === 'Home') show(0);
            else if (e.key === 'End') show(5);
            else if (/^[0-5]$/.test(e.key)) show(Number(e.key));
            else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.saveScrub(true); return; }
            else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); this.cancelScrub(); return; }
            else return;
            e.preventDefault();
        });

        // Başka bir yere tıklanırsa seçilen puan kaybolmasın: kısa süre sonra kendiliğinden kaydet
        el.addEventListener('blur', () => {
            clearTimeout(s.blurTimer);
            s.blurTimer = setTimeout(() => { if (this.scrub === s) this.saveScrub(false); }, 300);
        });
        el.addEventListener('focus', () => clearTimeout(s.blurTimer));
    },

    // − / + : yarım puan adımları
    stepTrack(idx, delta) {
        const tr = AppState.currentModalAlbum?.tracks?.[idx];
        if (!tr) return;
        const next = Math.min(5, Math.max(0, (tr.rating || 0) + delta));
        this.setTrackRating(idx, next);
        const sel = delta > 0 ? '[data-rate-inc]' : '[data-rate-dec]';
        const btn = document.querySelector(`#modal-tracklist ${sel}`);
        (btn && !btn.disabled ? btn : document.querySelector('#modal-tracklist [data-rate-inc], #modal-tracklist [data-rate-dec]'))?.focus({ preventScroll: true });
    },

    // Eski yıldız tıklaması için: aynı puana tekrar basınca sıfırlar
    rateTrack(idx, r) {
        const tr = AppState.currentModalAlbum?.tracks?.[idx];
        if (!tr) return;
        this.setTrackRating(idx, tr.rating === r ? 0 : r);
    },

    setTrackRating(idx, value) {
        const al = AppState.currentModalAlbum;
        if (!al?.tracks?.[idx]) return;
        al.tracks[idx].rating = value; al.sortAt = new Date().toISOString();
        this.renderTracklist();
        this.calculateAverageScore();

        // Durumu kendiliğinden ilerlet: ilk puan → Dinliyorum, tüm parçalar puanlanınca → Bitti
        const prog = AlbumUtils.progress(al);
        const st = AlbumUtils.status(al);
        if (st === 'planned' && prog.rated > 0) al.status = 'listening';
        if (prog.total > 0 && prog.rated === prog.total && st !== 'done') al.status = 'done';
        this.renderModalStatus();

        this.persistIfSaved();
        this.updateModalButtons();
    },

    calculateAverageScore() {
        const al = AppState.currentModalAlbum;
        if(!al) return;

        const totalTracks = al.tracks ? al.tracks.length : 0;
        const ratedTracks = al.tracks ? al.tracks.filter(tr => tr.rating > 0) : [];
        const runningAvg = ratedTracks.length ? ratedTracks.reduce((s, tr) => s + tr.rating, 0) / ratedTracks.length : 0;
        const shown = Math.round(runningAvg * 10) / 10;

        const avgEl = document.getElementById('modal-avg-score');
        if (avgEl) avgEl.textContent = shown > 0 ? shown.toFixed(1) : '–';

        // Mühür rengi puana göre; tüm parçalar puanlanmadıysa kesikli çizgi
        const stamp = document.getElementById('modal-stamp');
        if (stamp) {
            const complete = totalTracks > 0 && ratedTracks.length === totalTracks;
            stamp.className = `score-badge ${complete ? '' : 'is-partial'} flex-shrink-0 w-[68px] h-[68px] md:w-[80px] md:h-[80px] rounded-full flex items-center justify-center -rotate-[8deg] ${AlbumUtils.tier(shown).text}`;
            stamp.setAttribute('aria-label', `${t('album_avg')}: ${shown > 0 ? shown.toFixed(1) : '–'}`);
        }

        const progEl = document.getElementById('modal-rated-progress');
        if (progEl) progEl.textContent = totalTracks > 0 ? `${ratedTracks.length} / ${totalTracks} ${t('tracks_rated')}` : '';

        al.averageScore = totalTracks > 0 && ratedTracks.length === totalTracks ? shown : 0;
        // Puanlamanın bittiği an: ilk tamamlandığında kaydedilir (eski albümlerde son puanlama zamanı)
        if (al.averageScore > 0) { if (!al.completedAt) al.completedAt = al.sortAt || new Date().toISOString(); }
        else if (al.completedAt) delete al.completedAt;
    },

    addNewTrack() {
        if (!AppState.currentModalAlbum) return;
        if (!AppState.currentModalAlbum.tracks) AppState.currentModalAlbum.tracks = [];
        const tracks = AppState.currentModalAlbum.tracks;
        tracks.push({ id: 'manual_' + Date.now(), title: t('add_new_track'), number: String(tracks.length + 1), rating: 0 });
        this.renderTracklist();
        this.calculateAverageScore();
        this.updateModalButtons();
    },

    deleteTrack(idx) {
        if (!AppState.currentModalAlbum || !AppState.currentModalAlbum.tracks) return;
        AppState.currentModalAlbum.tracks.splice(idx, 1);
        this.editingTrack = null;
        this.renderTracklist();
        this.calculateAverageScore();
        this.updateModalButtons();
    },

    // Alt bar: Ekle / Güncelle / Kaldır
    updateModalButtons() {
        const con = document.getElementById('modal-save-btn-container'), al = AppState.currentModalAlbum;
        if(!con || !al) return;
        const orig = AppState.library.find(a => a.id === al.id);
        const isMod = orig ? JSON.stringify(orig) !== JSON.stringify(al) : true;
        const primary = 'h-12 px-6 rounded-full bg-primary text-darker text-sm font-black active:scale-[0.98] transition-transform';

        if (!orig) con.innerHTML = `<button onclick="app.saveAlbumToLibrary()" class="${primary}">${t("add")}</button>`;
        else if (isMod) con.innerHTML = `<button onclick="app.saveAlbumToLibrary()" class="${primary}">${t("update")}</button>`;
        else con.innerHTML = `<button onclick="app.confirmRemoveAlbum('${Utils.escapeHTML(al.id)}')" class="h-12 px-3 rounded-full text-sm font-bold text-red-700 dark:text-red-400 hover:bg-red-500/10 flex items-center justify-center" aria-label="${t("remove")}" title="${t("remove")}"><i class="ph-bold ph-trash text-xl md:hidden" aria-hidden="true"></i><span class="hidden md:inline">${t("remove")}</span></button>`;
    },

    // Telefonda: üstteki işlemler tek "⋮" düğmesinin altında toplanır
    toggleModalMenu(force) {
        const menu = document.getElementById('modal-actions');
        const btn = document.getElementById('modal-more-btn');
        if (!menu || !btn) return;
        const open = typeof force === 'boolean' ? force : !menu.classList.contains('is-open');
        menu.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', open);
        if (open && !this._menuBound) {
            this._menuBound = true;
            // Menüdeki bir işleme ya da dışarıya dokununca kapanır
            document.addEventListener('click', (e) => {
                if (!menu.classList.contains('is-open') || e.target.closest('#modal-more-btn')) return;
                this.toggleModalMenu(false);
            }, true);
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && menu.classList.contains('is-open')) { e.stopPropagation(); this.toggleModalMenu(false); btn.focus(); }
            }, true);
        }
    },

    confirmRemoveAlbum(id) {
        if (confirm(t('confirm_remove'))) this.removeAlbumFromLibrary(id);
    },
    
        saveAlbumToLibrary() {
        const al = AppState.currentModalAlbum;
        if (!al) return;
        const now = new Date().toISOString();
        const idx = AppState.library.findIndex(a => a.id === al.id);
        if (idx > -1 && !al.sortAt) al.sortAt = AlbumUtils.lastActivity(AppState.library[idx]); al.updatedAt = now;

        if (idx > -1) {
            AppState.library[idx] = structuredClone(al);
            showToast(t("toast_changes_saved"), "success");
        } else {
            al.dateAdded = now;
            AppState.library.unshift(structuredClone(al));
            showToast(t("toast_album_added"), "success");
        }

        this.saveAlbumData(al);
        this.updateModalButtons();
        this.renderDateAdded();
        if (AppState.currentView === 'library') this.renderLibrary();
    },
    
    removeAlbumFromLibrary(id) {
        AppState.library = AppState.library.filter(a => a.id !== id); 
        this.deleteAlbumData(id); 
        showToast(t("toast_album_removed"), "info");
        this.closeModal();
        if(AppState.currentView === 'library') { this.renderLibrary(); }
        if(AppState.currentView === 'queue') { this.renderQueue(); }
    },

    // --- Dinlenecekler (kuyruk) ---
    relativeTime(iso) {
        const diffDays = Math.round((new Date(iso) - new Date()) / 86400000);
        const rtf = new Intl.RelativeTimeFormat(AppState.language === 'en' ? 'en' : 'tr', { numeric: 'auto' });
        if (Math.abs(diffDays) < 7) return rtf.format(diffDays, 'day');
        if (Math.abs(diffDays) < 60) return rtf.format(Math.round(diffDays / 7), 'week');
        if (Math.abs(diffDays) < 365) return rtf.format(Math.round(diffDays / 30), 'month');
        return rtf.format(Math.round(diffDays / 365), 'year');
    },

    getQueue() {
        const dir = AppState.queueSort === 'newest' ? -1 : 1;
        return AppState.library
            .filter(a => AlbumUtils.status(a) === 'planned')
            .sort((a, b) => (new Date(a.dateAdded || 0) - new Date(b.dateAdded || 0)) * dir);
    },

    renderQueue() {
        const list = document.getElementById('queue-list');
        const sub = document.getElementById('queue-subtitle');
        const sortLabel = document.getElementById('queue-sort-label');
        if (!list) return;
        if (sortLabel) sortLabel.textContent = AppState.queueSort === 'newest' ? t('queue_sort_newest') : t('queue_sort_oldest');

        if (AppState.isLoading) {
            list.innerHTML = Array.from({ length: 3 }, () => `<li class="skeleton-row" aria-hidden="true"><div class="skeleton w-16 h-16 rounded-lg"></div><div class="flex-1 flex flex-col gap-2 justify-center"><div class="skeleton h-3 w-2/3 rounded"></div><div class="skeleton h-3 w-1/3 rounded"></div></div></li>`).join('');
            if (sub) sub.textContent = '';
            return;
        }

        const queue = this.getQueue();
        if (sub) {
            if (!queue.length) sub.textContent = '';
            else {
                const oldest = queue.reduce((m, a) => (new Date(a.dateAdded) < new Date(m.dateAdded) ? a : m), queue[0]);
                sub.textContent = `${queue.length} ${t('queue_subtitle')} · ${t('queue_oldest')} ${this.relativeTime(oldest.dateAdded)}`;
            }
        }

        if (!queue.length) {
            list.innerHTML = `<li class="p-6 text-center text-sm text-gray-600 dark:text-gray-400 rounded-2xl bg-white dark:bg-surface border border-lightBorder dark:border-gray-800">${AppState.isLoggedIn ? t('queue_empty') : t('login_empty_desc')}</li>`;
            return;
        }

        list.innerHTML = queue.map(a => `
            <li class="flex gap-3 items-center p-2.5 rounded-2xl bg-white dark:bg-surface border border-lightBorder dark:border-gray-800">
                <button onclick="app.openAlbumModal('${Utils.escapeHTML(a.id)}')" class="flex gap-3 items-center flex-1 min-w-0 text-left rounded-xl">
                    <img ${AlbumUtils.coverAttrs(a)} alt="" loading="lazy" class="w-16 h-16 rounded-lg object-cover flex-shrink-0">
                    <span class="flex flex-col gap-0.5 min-w-0">
                        <span class="text-sm font-bold italic text-gray-900 dark:text-white truncate">${Utils.escapeHTML(a.title)}</span>
                        <span class="text-xs text-gray-700 dark:text-gray-300 truncate">${Utils.escapeHTML(a.artist)} · ${Utils.escapeHTML(a.year)}</span>
                        <span class="text-[11px] text-gray-600 dark:text-gray-400">${this.relativeTime(a.dateAdded)}</span>
                    </span>
                </button>
                <button onclick="app.startListening('${Utils.escapeHTML(a.id)}')" aria-label="${Utils.escapeHTML(a.title)} — ${t('start_listening')}" class="w-11 h-11 rounded-full bg-primary/15 text-[#a85a1a] dark:text-primary flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform">
                    <i class="ph-fill ph-play text-lg"></i>
                </button>
            </li>`).join('');
    },

    toggleQueueSort() {
        AppState.queueSort = AppState.queueSort === 'oldest' ? 'newest' : 'oldest';
        localStorage.setItem('albumDiaryQueueSort', AppState.queueSort);
        this.renderQueue();
    },

    startListening(id) {
        const idx = AppState.library.findIndex(a => a.id === id);
        if (idx === -1) return;
        const album = AppState.library[idx];
        album.status = 'listening';
        if (!album.sortAt) album.sortAt = AlbumUtils.lastActivity(album); album.updatedAt = new Date().toISOString();
        this.saveAlbumData(album);
        showToast(t('started_listening'), "success");
        this.renderQueue();
        this.openAlbumModal(id);
    },

    pickRandomFromQueue() {
        const queue = this.getQueue();
        if (!queue.length) { showToast(t('queue_empty'), "info"); return; }
        const pick = queue[Math.floor(Math.random() * queue.length)];
        this.startListening(pick.id);
    },

    // --- Aylık / yıllık özet ---
    getSummaryRange() {
        const now = new Date();
        if (AppState.summaryPeriod === 'year') {
            const y = now.getFullYear() + AppState.summaryOffset;
            return { start: new Date(y, 0, 1), end: new Date(y + 1, 0, 1), label: `${y}` };
        }
        const start = new Date(now.getFullYear(), now.getMonth() + AppState.summaryOffset, 1);
        const end = new Date(start.getFullYear(), start.getMonth() + 1, 1);
        const label = start.toLocaleDateString(AppState.language === 'en' ? 'en-US' : 'tr-TR', { month: 'long', year: 'numeric' });
        return { start, end, label };
    },

    shiftSummaryPeriod(step) {
        if (AppState.summaryOffset + step > 0) return; // geleceğe gitme
        AppState.summaryOffset += step;
        this.renderSummary();
    },

    toggleSummaryPeriod() {
        AppState.summaryPeriod = AppState.summaryPeriod === 'month' ? 'year' : 'month';
        AppState.summaryOffset = 0;
        this.renderSummary();
    },

    renderSummary() {
        const card = document.getElementById('summary-card');
        const labelEl = document.getElementById('summary-period-label');
        if (!card) return;
        const { start, end, label } = this.getSummaryRange();
        if (labelEl) labelEl.textContent = label;

        const inRange = iso => { const d = new Date(iso); return !isNaN(d) && d >= start && d < end; };
        const albums = AppState.library.filter(a => {
            if (AlbumUtils.status(a) === 'planned' && !(a.listens || []).length) return false;
            const dates = [a.dateAdded, ...(a.listens || []).map(l => l.date)];
            if (AlbumUtils.status(a) === 'done') dates.push(a.updatedAt);
            return dates.some(d => d && inRange(d));
        });

        const switchBtn = `<button onclick="app.toggleSummaryPeriod()" class="h-11 px-4 rounded-xl bg-primary text-darker text-sm font-black active:scale-[0.98] transition-transform">${AppState.summaryPeriod === 'month' ? `${start.getFullYear()} ${t('year_summary').toLowerCase()}` : t('month_summary')}</button>`;

        if (!albums.length) {
            card.innerHTML = `<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><p class="text-base text-gray-700 dark:text-gray-300">${t('summary_empty')}</p>${switchBtn}</div>`;
            return;
        }

        const scored = albums.map(a => ({ a, s: a.averageScore || AlbumUtils.runningAvg(a) })).filter(x => x.s > 0);
        const avg = scored.length ? (scored.reduce((sum, x) => sum + x.s, 0) / scored.length).toFixed(1) : '-';
        const best = scored.sort((x, y) => y.s - x.s)[0];
        const trackRatings = albums.reduce((n, a) => n + AlbumUtils.ratedTracks(a).length, 0);
        const reviews = albums.filter(a => a.note && a.note.trim()).length;
        const mostCommon = arr => { const c = {}; arr.forEach(x => { if (x) c[x] = (c[x] || 0) + 1; }); return Object.entries(c).sort((x, y) => y[1] - x[1])[0]?.[0]; };
        const topArtist = mostCommon(albums.map(a => a.artist));
        const topGenre = mostCommon(albums.map(a => a.genres?.[0] ? Genre.key(a.genres[0]) : ''));

        const stat = (n, l) => `<div class="p-3 rounded-xl bg-lightBg dark:bg-dark flex flex-col gap-0.5"><span class="text-2xl font-black text-gray-900 dark:text-white">${n}</span><span class="text-xs text-gray-600 dark:text-gray-400">${l}</span></div>`;
        const row = (l, v, italic = false) => v ? `<div class="flex justify-between gap-3 text-sm"><span class="text-gray-600 dark:text-gray-400">${l}</span><span class="font-bold text-gray-900 dark:text-white text-right truncate ${italic ? 'italic' : ''}">${v}</span></div>` : '';

        card.innerHTML = `
            <p class="text-lg leading-relaxed text-gray-900 dark:text-white mb-4">
                ${t('summary_listened')} <b class="text-[#a85a1a] dark:text-primary">${albums.length} ${t('summary_albums')}</b> ${t('summary_avg')} <b class="text-[#a85a1a] dark:text-primary">${avg}</b>.
            </p>
            <div class="grid grid-cols-3 gap-2 mb-4">
                ${stat(albums.length, t('summary_albums'))}
                ${stat(trackRatings, t('summary_track_ratings'))}
                ${stat(reviews, t('summary_reviews'))}
            </div>
            <div class="flex flex-col gap-2 mb-4">
                ${best ? row(t('summary_album_of'), `${Utils.escapeHTML(best.a.title)} · ${best.s.toFixed(1)}`, true) : ''}
                ${row(t('summary_top_artist'), Utils.escapeHTML(topArtist || ''))}
                ${row(t('summary_top_genre'), Utils.escapeHTML(topGenre ? tGenre(topGenre) : ''))}
            </div>
            <div class="flex justify-end">${switchBtn}</div>`;
    },

    renderFavTracks() {
        const list = document.getElementById('fav-tracks-list');
        if (!list) return;
        const tracks = [];
        AppState.library.forEach(a => (a.tracks || []).forEach(tr => { if (tr.rating === 5) tracks.push({ tr, a }); }));
        tracks.sort((x, y) => new Date(AlbumUtils.lastActivity(y.a)) - new Date(AlbumUtils.lastActivity(x.a)));
        if (!tracks.length) { list.innerHTML = `<li class="p-3 text-sm text-gray-600 dark:text-gray-400">${t('no_fav_tracks')}</li>`; return; }
        list.innerHTML = tracks.slice(0, 6).map(({ tr, a }) => `
            <li>
                <button onclick="app.openAlbumModal('${Utils.escapeHTML(a.id)}')" class="w-full flex items-center gap-3 p-2 rounded-xl text-left hover:bg-lightBg dark:hover:bg-surfaceHover transition-colors">
                    <img ${AlbumUtils.coverAttrs(a)} alt="" loading="lazy" class="w-10 h-10 rounded object-cover flex-shrink-0">
                    <span class="flex-1 min-w-0">
                        <span class="block text-sm font-bold italic truncate text-gray-900 dark:text-white">${Utils.escapeHTML(tr.title)}</span>
                        <span class="block text-[11px] text-gray-600 dark:text-gray-400 truncate">${Utils.escapeHTML(a.artist)} · ${Utils.escapeHTML(a.title)}</span>
                    </span>
                    <span class="text-xs font-black ${AlbumUtils.tier(5).text} flex-shrink-0">5 ★</span>
                </button>
            </li>`).join('');
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
        this.renderSummary();
        this.renderFavTracks();
        // Dinlenecekler (henüz dinlenmemiş) istatistiklere dahil edilmez
        const lib = AppState.library.filter(a => AlbumUtils.status(a) !== 'planned');
        const setEl = (id, txt) => { const el = document.getElementById(id); if(el) el.textContent = txt; };
        
        setEl('stat-total-albums', lib.length);
        const uniqueArtists = new Set(lib.map(a => a.artist)).size;
        setEl('stat-unique-artists', uniqueArtists);

        const rated = lib.filter(a => a.averageScore > 0);
        const gAvg = rated.length ? (rated.reduce((s,a) => s + a.averageScore, 0) / rated.length).toFixed(1) : "0.0";
        setEl('stat-avg-rating', gAvg);

        const aStats = {}, gStats = {};
        lib.forEach(a => {
            if(!aStats[a.artist]) aStats[a.artist] = { c:0, s:0, rc:0 };
            aStats[a.artist].c++; if(a.averageScore > 0) { aStats[a.artist].s += a.averageScore; aStats[a.artist].rc++; }
            if(a.genres) a.genres.forEach(g => { const ng = Genre.key(g); if(!gStats[ng]) gStats[ng]={n:g.trim(),c:0, raw: g.trim()}; gStats[ng].c++; });
        });

        const distribution = Array(10).fill(0); // 0.5, 1, 1.5 ... 5
        lib.forEach(a => {
            if(a.tracks) {
                a.tracks.forEach(t => { if(t.rating >= 0.5 && t.rating <= 5) distribution[Math.round(t.rating * 2) - 1]++; });
            }
        });

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

        const isDark = document.documentElement.classList.contains('dark');
        const tColor = isDark ? '#d1d5db' : '#374151';
        const gColor = isDark ? '#374151' : '#e5e7eb';
        
        const buildChart = (canvasId, type, labels, dataPoints, hexColor, forceZero = true) => {
            const ctx = document.getElementById(canvasId);
            if(!ctx) return;
            
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

        buildChart('chart-distribution', 'bar', ['½', '1', '1½', '2', '2½', '3', '3½', '4', '4½', '5'], distribution, '#d17b38');
        buildChart('chart-decade', 'bar', decadeLabels, decadeData, '#3b82f6', false);
        buildChart('chart-trends', 'line', sortedMonths, trendData, '#22c55e', false);

        const tl = document.getElementById('top-albums-list'); 
        if(tl) {
            tl.innerHTML = '';
            [...rated].sort((a,b)=>b.averageScore-a.averageScore).slice(0,5).forEach((al, i) => {
                const el = document.createElement('div'); el.className = 'flex items-center gap-3 p-2 bg-lightBg dark:bg-surface rounded-xl cursor-pointer active:scale-95 transition-transform hover:bg-lightHighlight dark:hover:bg-surfaceHover'; el.onclick = () => this.openAlbumModal(al.id, al.title, al.artist, al.year);
                el.innerHTML = `<span class="font-bold text-gray-600 dark:text-gray-400 w-4 text-center">${i+1}</span><img ${AlbumUtils.coverAttrs(al)} alt="" class="w-10 h-10 rounded shadow-sm object-cover"><div class="flex-1 min-w-0"><p class="text-sm font-bold truncate italic">${Utils.escapeHTML(al.title)}</p><p class="text-[11px] text-gray-500 truncate">${Utils.escapeHTML(al.artist)}</p></div><span class="text-xs font-bold text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 px-2 py-1 rounded-lg">${al.averageScore.toFixed(1)}</span>`;
                tl.appendChild(el);
            });
        }

        ['rating', 'count'].forEach(type => {
            const btn = document.getElementById(`btn-stats-sort-${type}`); 
            const iconDir = document.getElementById(`icon-stats-sort-${type}-dir`);
            if (!btn || !iconDir) return;
            if (AppState.statsArtistSortBy === type) {
                btn.classList.add('text-primary', 'bg-primary/10'); btn.classList.remove('text-gray-500');
                iconDir.className = `ph-bold ph-arrow-${AppState.statsArtistSortDirection === 'desc' ? 'down' : 'up'} text-[11px]`;
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
                li.innerHTML = `<div><p class="font-bold">${Utils.escapeHTML(art)}</p><p class="text-[11px] text-gray-500">${st.c} ${t('albums')}</p></div><span class="${AlbumUtils.tier(parseFloat(avg)).text} font-bold flex items-center gap-1"><i class="ph-fill ph-star"></i> ${avg}</span>`;
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

// Ziyaretçi modu: düzenleme işlevleri yalnızca yönetici girişinde çalışır
const ADMIN_ONLY = [
    'importData', 'uploadAvatar', 'persistIfSaved', 'saveAlbumData', 'deleteAlbumData', 'cacheCover', 'cacheMissingCovers',
    'search', 'searchFromLink', 'addToQueue', 'startListening',
    'toggleLoop', 'toggleShelf', 'setAlbumStatus', 'addTag', 'removeTag', 'logListen', 'deleteListen',
    'editReviewNote', 'updateAddedDate', 'toggleEditMode', 'updateAlbumField', 'updateTrackField',
    'toggleCoverEdit', 'applyCustomCover', 'uploadCover', 'findCover', 'pickCover',
    'autoFetchGenres', 'promptAddGenre', 'confirmAddGenre', 'removeGenre',
    'toggleNoteEditMode', 'saveNote',
    'selectTrack', 'focusScrub', 'saveScrub', 'stepTrack', 'rateTrack', 'setTrackRating', 'addNewTrack', 'deleteTrack',
    'confirmRemoveAlbum', 'removeAlbumFromLibrary'
];
ADMIN_ONLY.forEach(name => {
    const fn = app[name];
    if (typeof fn !== 'function') return;
    app[name] = function (...args) { return AppState.isAdmin ? fn.apply(this, args) : undefined; };
});
{
    // Ziyaretçide: not yalnızca okunur, parça seçilmez, arama sayfası açılmaz
    const setNote = app.setNoteEditMode, firstUnrated = app.firstUnratedTrack, show = app.showView;
    app.setNoteEditMode = function (isEdit) { return setNote.call(this, AppState.isAdmin ? isEdit : false); };
    app.firstUnratedTrack = function (...args) { return AppState.isAdmin ? firstUnrated.apply(this, args) : null; };
    app.showView = function (view, ...rest) { return show.call(this, !AppState.isAdmin && view === 'search' ? 'library' : view, ...rest); };
    // Ziyaretçi ayarlar panelini açamaz; profil fotoğrafına dokununca yönetici girişi açılır
    const sidebarToggle = app.toggleSidebar;
    app.toggleSidebar = function (open) {
        const closed = document.getElementById('right-sidebar')?.classList.contains('translate-x-full');
        const opening = open === true || (open === undefined && closed);
        if (opening && !AppState.isAdmin) return this.toggleLoginModal(true);
        return sidebarToggle.call(this, open);
    };
}

window.app = app;
app.init();