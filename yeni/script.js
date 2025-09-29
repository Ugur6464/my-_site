// TradingView Grafik
new TradingView.widget({
    "container_id": "tradingview_chart",
    "autosize": true,
    "symbol": "BINANCE:BTCUSDT",
    "interval": "60",
    "timezone": "Europe/Istanbul",
    "theme": "light",
    "style": "1",
    "locale": "tr",
    "toolbar_bg": "#f1f3f6",
    "enable_publishing": false,
    "allow_symbol_change": true,
    "studies": ["MASimple@tv-basicstudies","RSI@tv-basicstudies"],
    "withdateranges": true,
    "hide_side_toolbar": false
});

// Haberler
async function fetchNews() {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = `<p>Haberler yükleniyor...</p>`;
    
    try {
        const response = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
        const data = await response.json();
        newsContainer.innerHTML = '';
        data.Data.slice(0, 6).forEach(news => {
            const card = document.createElement('div');
            card.className = 'news-card';
            card.innerHTML = `
                <h3>${news.title}</h3>
                <p>${news.body.length > 80 ? news.body.substring(0, 80) + '...' : news.body}</p>
                <a href="${news.url}" target="_blank">Haberi Oku</a>
            `;
            newsContainer.appendChild(card);
        });
    } catch (err) {
        newsContainer.innerHTML = `<p>Haberler yüklenemedi.</p>`;
        console.error(err);
    }
}

fetchNews();
setInterval(fetchNews, 5 * 60 * 1000); // 5 dakikada bir yenile
document.getElementById('showBacktest').addEventListener('click', function() {
    const backtest = document.getElementById('backtestInfo');
    if (backtest.style.display === 'none') {
        backtest.style.display = 'block';
    } else {
        backtest.style.display = 'none';
    }
});
document.getElementById('showBacktest').addEventListener('click', function() {
    const backtest = document.getElementById('backtestInfo');
    if (backtest.style.display === 'none') {
        backtest.style.display = 'block';
        initBacktestChart(); // grafiği oluştur
    } else {
        backtest.style.display = 'none';
    }
});

function initBacktestChart() {
    const ctx = document.getElementById('backtestChart').getContext('2d');
    const backtestChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Trade 1','Trade 2','Trade 3','Trade 4','Trade 5'],
            datasets: [{
                label: 'Kar/Zarar / Profit/Loss',
                data: [5,-2,3,-1,4],
                borderColor: 'green',
                backgroundColor: 'rgba(0,255,0,0.2)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: false }
            }
        }
    });
}
