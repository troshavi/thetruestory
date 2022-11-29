(function () {

    var before = document.querySelector('[aria-labelledby="top-heading"]').nextSibling;
    var parent = before.parentNode;

    let p = document.createElement('p');
    p.innerHTML = `
    <section aria-labelledby="thetruestory">
    <div class="news-app__heading-wrapper">
        <div class="news-top-rubric-heading news-app__heading">
            <h1>
                <a href="#" target="_self" rel="noopener">The True Story</a>
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


    function createNewsDiv(options){

        title = options.title || '';
        annotation = options.annotation || '';
        cluster_id = options.cluster_id || '';
        img_src = "https://d1c0654vh4devl.cloudfront.net/collage_stories/"+cluster_id;
        url_href = "https://thetruestory.news/stories/"+cluster_id;

        aggregates_count = options.aggregates_count || 1;

        created_at = new Date(options.created_at) || new Date(0);

        source_name = options.source_name || '';
        source_logo = options.source_logo || '';

        source_logo_html = '';
        if(source_logo != '')
            source_logo_html = `<img class="nG8s2-image nG8s2-image_loaded" loading="lazy" alt="" src="${source_logo}" width="16" height="16">`;



        let newDiv = document.createElement('div');
        newDiv.classList.add("mg-grid__col");
        newDiv.classList.add("mg-grid__col_xs_4");

        newDiv.innerHTML = `
            <div class="mg-card mg-card_flexible-half mg-card_type_image mg-grid__item">
                <div class="mg-card__content">
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
                    
                    <div class="mg-card__media">
                        <div class="mg-card-media mg-card-media_type_image mg-card-media_square mg-card__media-block mg-card__media-block_type_image">
                        <div class="mg-card-media__image">
                            <img class="tts-image tts-image_loaded" alt="" src="${img_src}" style="background-color:#D8D8D8"></div>
                        </div>
                    </div>
                </div>
                <div class="mg-card-footer mg-card__footer mg-card__footer_type_image">
                    <div class="mg-card-footer__left">
                        <div class="mg-card-source mg-card__source mg-card__source_dot">
                        <span class="mg-card-source__source">
                            <span class="mg-favorites-dot__indicator mg-favorites-dot__indicator_size_s">
                                <div class="mg-favorites-dot__image">
                                    ${source_logo_html}
                                </div>
                            </span>
                            <a href="${url_href}" target="_self" rel="noopener" class="mg-card__source-link" aria-label="Источник: ${source_name}">${source_name}</a>
                        </span>
                        <span class="mg-card-source__time">${created_at.getHours()}:${created_at.getMinutes()}</span>
                        </div>
                    </div>
                    <div class="mg-card-footer__right"></div>
                </div>
            </div>
        `;

        return newDiv;
    }

    var thetruestory_body = document.getElementById("thetruestory_body");
    thetruestory_body.append(createNewsDiv({
        title: "Защита Ройзмана не будет обжаловать его статус иноагента",
        cluster_id: "0928846e-6cef-11ed-948e-1d3b18dfa35c",
        created_at: "2022-11-26T14:45:31.832922+00:00",
    }));
    thetruestory_body.append(createNewsDiv({
        title: "Защита Ройзмана не будет обжаловать его статус иноагента",
        cluster_id: "0928846e-6cef-11ed-948e-1d3b18dfa35c",
    }));
    thetruestory_body.append(createNewsDiv({
        title: "Защита Ройзмана не будет обжаловать его статус иноагента",
        cluster_id: "0928846e-6cef-11ed-948e-1d3b18dfa35c",
    }));
    thetruestory_body.append(createNewsDiv({
        title: "Защита Ройзмана не будет обжаловать его статус иноагента",
        cluster_id: "0928846e-6cef-11ed-948e-1d3b18dfa35c",
    }));

}());