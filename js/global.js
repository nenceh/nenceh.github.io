$(document).ready(function(){
    $(window).on("load resize scroll", function (){
        if ($(window).width() < 1103 && scrollY > 600){
            $('aside.back-to-top').css({'visibility':'visible', 'opacity':1})
        }else{
            $('aside.back-to-top').css({'visibility':'hidden', 'opacity':0})
        }

        if((scrollY + $('.topnav-container').height() + $('.page-banner-container').height() > $(".body-content main").height()) || ($(window).width() < 480 && scrollY > ($('.topnav-container').height() + $('.page-banner-container').height() + $('.info-container').height()))){
            $('section#find-me').css({'visibility':'hidden', 'opacity':0})
        }else{
            $('section#find-me').css({'visibility':'visible', 'opacity':1})
        }
    })

    $("aside.back-to-top button#to-top").click(function(){
        $("html, body").animate({scrollTop: 0}, 100)
    })

    $(".panel-control").click(function(){
        $(".panel"+$(this).attr("value")).slideToggle(1000, function() {
        if ($(this).is(':visible'))
            $(this).css({'display':'inline-block'})
        })
        
        $(this).find('svg').toggleClass('rotate')
    })

    $("button#early-regex").click(function(){
        if($("input#sample").val()){
            $("p.early-regex-result").text($("input#sample").val().toLowerCase().split(/(?<=["(),.!])[\s]*|[\s]*(?=[ .,:;!?"()])+[\s]*/))
        } else $("p.early-regex-result").text("[Invalid input!]")
    })

    $(window).on("scroll", function (){
        // in-page navigation
        var inPageNav = document.querySelector("nav.toc")
        var inPageLinks = document.querySelectorAll(".in-page-link")
        var sections = document.querySelectorAll("main > section")
        var currentSection

        if(inPageLinks.length > 0) currentSection = inPageLinks[0].getAttribute("href").substring(1)

        var offset = 160
        sections.forEach((section)=>{
            const sectionTop = section.offsetTop
            if(scrollY >= (parseInt($(".page-banner-container").height()) + parseInt($(".info-container").height())) - offset){
                if(scrollY >= (sectionTop - $(".topnav-container").height() - parseInt($("main").css("gap"))) - offset){
                    currentSection = section.getAttribute("id")
                }
            }
        })

        inPageLinks.forEach((item)=>{
            item.classList.remove("in-page-current")
            if(item.href.includes(currentSection))
                item.classList.add("in-page-current")
            else item.classList.remove("in-page-current")
        })
    })

    // showcase carousel
    $(window).on("load", function(){
        const list = document.querySelectorAll('.showcase-item-container');

        var imgs = document.querySelectorAll('.showcase-item img');
        if(imgs.length < 1)imgs = document.querySelectorAll('section.portfolio-entry img');
        
        imgs.forEach((i) => {
            $(i).attr('src', $(i).attr('original-src'));
            $(i).removeAttr('original-src');
        });

        if(list.length > 0){
            const controls = document.querySelectorAll('section#showcase button.btn-icon');
            for(let i = 0; i < list.length; i++){
                $('div#pagination').append('<div class="pagination-dot" id="showcase-item-' + (i+1) + '"/>')
            }
            const pagination = document.querySelectorAll('div.pagination-dot');
            const disableDuration = 700;
            var curIdx = 0, bwdIdx = list.length - 1, fwdIdx = curIdx + 1, direction = 1, ffwdIdx = fwdIdx + 1;
            $(pagination[curIdx]).addClass('current')

            const slide = (x) => {
                $(controls).attr("disabled", true);

                if(x != direction) direction = x;

                $(list[curIdx]).removeClass('current prev next next_ animate')
                $(list[bwdIdx]).removeClass('current prev next next_ animate')
                $(list[fwdIdx]).removeClass('current prev next next_ animate')
                $(pagination[curIdx]).removeClass('current')
                
                if(x == 1) $(list[ffwdIdx]).removeClass('current prev next next_ animate');
                else $(list[ffwdIdx]).removeClass('current prev next next_');

                if(x == 1){
                    bwdIdx = curIdx;
                    curIdx = (curIdx + 1) % list.length;
                    fwdIdx = (curIdx + 1) % list.length
                } else{
                    fwdIdx = curIdx;
                    curIdx = (curIdx - 1 + list.length) % list.length
                    bwdIdx = (curIdx - 1 + list.length) % list.length
                }

                ffwdIdx = (fwdIdx + 1) % list.length
                $(pagination[curIdx]).addClass('current')

                setIdx();

                if (list.length > 1){
                    if(x == -1){
                        setTimeout(() => {
                            $('.showcase-item-container.animate:not(.prev):not(.current):not(.next):not(.next_)').removeClass('animate');
                            $('.showcase-item-container.prev').addClass('animate');
                        }, disableDuration);
                    }
                    setTimeout(() => $(controls).attr("disabled", false), disableDuration)
                }
            }

            const setIdx = () => {
                $(list[curIdx]).addClass('current')
                $(list[bwdIdx]).addClass('prev')
                $(list[fwdIdx]).addClass('next')
                $(list[ffwdIdx]).addClass('next_')

                if(direction == 1){
                    $(list[bwdIdx]).addClass('animate')
                }

                $(list[curIdx]).addClass('animate')
                $(list[fwdIdx]).addClass('animate')
                $(list[ffwdIdx]).addClass('animate')
            }

            setIdx();

            if(list.length > 1){
                setTimeout(() => $('.showcase-item-container').css({transition: 'transform 0.7s ease-out'}), 100);
            }

            $("button#showcase-bwd").click(() => slide(-1))
            $("button#showcase-fwd").click(() => slide(1))
        }
    })
})