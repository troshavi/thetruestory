(function () {

    var h1_title = "The True Story";
    var limit_news = 9;

    var bf = new BackgroundFetch();
    bf.onreadystatechange = tts_main_page;
    bf.send(`https://thetruestory.news/api/first?lang=ru&limit=${limit_news}&offset=${0}`);

    function tts_main_page(data) {
        var before = document.querySelector('[aria-labelledby="top-heading"]').nextSibling;
        var parent = before.parentNode;

        let p = document.createElement('p');
        p.innerHTML = `
            <section aria-labelledby="thetruestory">
            <div class="news-app__heading-wrapper">
                <div class="news-top-rubric-heading news-app__heading">
                    <h1>
                        <a href="#" target="_self" rel="noopener">${h1_title}</a>
                    </h1>
                </div>
            </div>

                <div class="mg-grid__row mg-grid__row_gap_8 mg-top-rubric-flexible-stories news-app__top">
                    <div class="mg-grid__col mg-grid__col_xs_12">
                        <div class="mg-grid__row mg-grid__row_gap_8" id="thetruestory_body">

                        </div>
                    </div>
                </div>
            </section>
            `;

        parent.insertBefore(p, before);


        function createNewsDiv(options) {

            let title = options.title || '';
            let annotation = options.annotation || '';
            let cluster_id = options.cluster_id || '';
            let img_src = "https://d1c0654vh4devl.cloudfront.net/collage_stories/" + cluster_id;
            //let url_href = "https://thetruestory.news/stories/"+cluster_id;
            let url_href = "https://dzen.ru/news/story/thetruestory?issue_tld=ru&cluster_id=" + cluster_id;

            let aggregates_count = options.aggregates_count || 1;

            let created_at = (new Date(options.created_at)).toLocaleString('ru-RU', {
                day: 'numeric',
                month: 'long',
                hour: 'numeric',
                minute: 'numeric',
            });

            let source_name = options.source_name || '';
            let source_logo = options.source_logo || '';

            let source_logo_html = '';
            if (source_logo != '')
                source_logo_html = `<img class="nG8s2-image nG8s2-image_loaded" loading="lazy" alt="" src="${source_logo}" width="16" height="16">`;


            let newDiv = document.createElement('div');
            newDiv.classList.add("mg-grid__col", "mg-grid__col_xs_4");

            newDiv.innerHTML = `
            <div class="mg-card mg-card_flexible-half mg-card_type_image mg-grid__item">
                <div class="mg-card__content tts_card_content">
                    <div class="mg-card__text-content">
                        <div class="mg-card__text">
                            <h2 class="mg-card__title">
                                <a href="${url_href}" target="_self" rel="noopener" class="mg-card__link">
                                    ${title}
                                </a>
                            </h2>
                            <div class="mg-card__annotation" style="-webkit-line-clamp: 3;">
                                ${annotation}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mg-card-footer mg-card__footer mg-card__footer_type_image">
                    <div class="mg-card-footer__left">
                        <div class="mg-card-source mg-card__source mg-card__source_dot">
               
                            <span class="mg-card-source__time">
                                ${created_at}
                            </span>
                        </div>
                    </div>
                    <div class="mg-card-footer__right"></div>
                </div>
            </div>
        `;

            function addImg(url, el) {
                const img = new Image();
                img.src = url;
                img.onload = () => {
                    let newDiv = document.createElement('div');
                    newDiv.classList.add("mg-card__media");
                    newDiv.innerHTML = `
                    <div class="mg-card__media">
                        <div class="mg-card-media mg-card-media_type_image mg-card-media_square mg-card__media-block mg-card__media-block_type_image">
                        <div class="mg-card-media__image">
                            <img class="tts-image tts-image_loaded" alt="" src="${url}" style="background-color:#D8D8D8"></div>
                        </div>
                    </div>
                `;

                    el.querySelector(".tts_card_content").append(newDiv);
                }
            };
            addImg(img_src, newDiv);


            return newDiv;
        }

        var thetruestory_body = document.getElementById("thetruestory_body");

        cluster_rank = data.content.data.cluster_rank;

        cluster_rank.forEach(function (item) {
            thetruestory_body.append(createNewsDiv({
                title: item.cluster.cluster_titles[0].title,
                cluster_id: item.cluster_id,
                created_at: item.cluster.cluster_items[0].news_newsitem.created_at,
            }));
        });
    }
})()