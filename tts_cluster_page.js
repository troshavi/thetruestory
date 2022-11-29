function tts_cluster_page(data){

    var before = document.querySelector('.mg-story-not-found');
    var parent = before.parentNode;
    parent.removeChild(before);

    let article = document.createElement('article');
    article.classList.add("mg-story", "news-story", "mg-grid__item");
    article.id = "thetruestory_body";
    parent.insertBefore(article, parent.firstChild);


    function createHeadNewsHTML(item){
        return `
        <div class="news-story__head">
            <a href=">${item.cluster_title_source.url}" target="_blank" rel="noopener" class="news-story__subtitle" aria-label="Источник: ${item.cluster_title_source.source.title}">
                <span class="mg-favorites-dot__indicator mg-favorites-dot__indicator_size_l news-story__subtitle-img">
                    <div class="mg-favorites-dot__image">
                        <div class="tts_icon tts_icon_${item.cluster_title_source.source.slug}"></div>
                    </div>
                </span>
                <span class="news-story__subtitle-text" aria-hidden="true">${item.cluster_title_source.source.title}</span>
            </a>
        </div>
        <h1 class="mg-story__title">
            <a href="${item.cluster_title_source.url}" target="_blank" rel="noopener" class="mg-story__title-link">
                ${item.title}
            </a>
        </h1>
        `
    }

    function createSnippetNewsItem(item){
        return`
        <div class="mg-snippet mg-snippets-group__item">
            <div class="mg-snippet__bullet"></div>
                <div class="mg-snippet__wrapper">
                    <div class="mg-snippet__content">
                        <div class="mg-text-cut mg-snippet__description">
                            <span class="mg-snippet__text">
                                ${item.text}
                            </span>
                            <div class="mg-snippet__agency-info"><span class="mg-snippet__agency">
                                <a href="${item.summary_source.url}" target="_blank" rel="noopener" class="mg-snippets-group__source">
                                    <span class="mg-snippet-source-info" role="presentation">
                                        <span class="mg-snippet-source-info__agency-name">
                                            ${item.summary_source.source.title}
                                        </span>
                                    </span>
                                </a></span>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    function createSnippetWithoutText(item){
        var source_date = new Date(item.news_newsitem.source_date);
        return`
        <div class="mg-snippet mg-snippet_without-text mg-story__snippet">
            <span class="mg-favorites-dot__indicator mg-favorites-dot__indicator_size_xl mg-snippet__image mg-snippet__image_type_logo" aria-label="Источник: ${item.news_newsitem.source.title}">
                <div class="mg-favorites-dot__image mg-snippet__src">
                    <div class="tts_icon_30 tts_icon_${item.news_newsitem.source.slug}"></div>
                </div>
            </span>
            <div class="mg-snippet__wrapper">
                <div class="mg-snippet__content">
                    <a href="${item.news_newsitem.url}" target="_blank" rel="noopener" class="mg-snippet__url">
                        <div class="mg-snippet__title">
                            ${item.news_newsitem.title}
                        </div>
                    </a>
                    <div class="mg-snippet__agency-info">
                        <span class="mg-snippet__agency">
                            <span class="mg-snippet-source-info" role="presentation">
                                <span class="mg-snippet-source-info__agency-name">
                                    ${item.news_newsitem.source.title}
                                </span>
                                <span class="mg-snippet-source-info__time">
                                    ${source_date.getHours()}:${source_date.getMinutes()}
                                </span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    function list_by_format(list, func_format){
        var res = '';
        list.forEach(item => {
            res += func_format(item)
        });
        return res;
    }

    function createNewsDiv(cluster_rank){
        var cluster_titles = cluster_rank.cluster.cluster_titles;
        var cluster_summaries = cluster_rank.cluster.cluster_summaries;
        var cluster_items = cluster_rank.cluster.cluster_items;

        var thetruestory_body = document.getElementById("thetruestory_body");
        thetruestory_body.innerHTML = `
            ${createHeadNewsHTML(cluster_titles[0])}

            <div class="mg-story__body">
                <div class="mg-story-summarization mg-story-summarization_teaser-type_first mg-story-summarization_has-bullets">
                    <div class="mg-snippets-group">
                        <div class="mg-snippets-group__body">
                            ${list_by_format(cluster_summaries, createSnippetNewsItem)}
                        </div>
                    </div>
                </div>
            </div>
            <div class="mg-story__source">
                <div class="mg-story__source-header">
                    <h2 class="mg-story__source-title">
                        <a href="" rel="noopener" class="mg-story__source-title-link">
                            Подробнее о событии
                        </a>
                    </h2>
                </div>
                ${list_by_format(cluster_items, createSnippetWithoutText)}
            </div>
        `;
    }

    cluster_rank = data.content.data.cluster_rank[0];
    console.log(cluster_rank);
    createNewsDiv(cluster_rank);

    
}