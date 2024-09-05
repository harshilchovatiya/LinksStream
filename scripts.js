document.addEventListener('DOMContentLoaded', function () {
    const username = 'harshilbmk'; // Replace with your Medium username
    const rssUrl = `https://medium.com/feed/@${username}`;
    const itemsToFetch = 10; // Number of items to fetch

    function fetchBlogs() {
        document.getElementById('loading-spinner').style.display = 'block';
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('loading-spinner').style.display = 'none';
                const items = data.items.slice(0, itemsToFetch); // Get only the first 10 items

                const container = document.getElementById('blog-container');

                // Clear existing items
                container.innerHTML = '';

                if (items.length === 0) {
                    container.innerHTML = '<p>No blogs found.</p>';
                } else {
                    // Append items
                    items.forEach(item => {
                        const blogItem = document.createElement('div');
                        blogItem.classList.add('grid-item');

                        // Extract the first image URL from the blog content
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(item.content, 'text/html');
                        const firstImage = doc.querySelector('img');
                        const thumbnailUrl = firstImage ? firstImage.src : 'default-thumbnail.jpg'; // Fallback image

                        const thumbnail = document.createElement('img');
                        thumbnail.src = thumbnailUrl;
                        thumbnail.alt = item.title;

                        const title = document.createElement('h3');
                        title.textContent = item.title;

                        blogItem.appendChild(thumbnail);
                        blogItem.appendChild(title);
                        container.appendChild(blogItem);
                        blogItem.addEventListener('click', () => openBlogDetail(item.link));
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching the feed:', error);
                const container = document.getElementById('blog-container');
                container.innerHTML = '<p>Failed to load blogs. Please try again later.</p>';
            }
            );
    }

    function openBlogDetail(url) {
        if (url) {
            window.open(url, '_blank');
        } else {
            alert('Blog link is not available.');
        }
    }


    // Initial fetch
    fetchBlogs();
});


window.addEventListener('scroll', () => {
    const button = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
        button.style.display = 'block';
    } else {
        button.style.display = 'none';
    }
});

document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

