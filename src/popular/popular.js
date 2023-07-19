window.addEventListener('load', onDocumentReady, false);

function onDocumentReady(){
    console.log("Ready");
    GetPopular();

}

function GetPopular(){
    fetch("https://api.themoviedb.org/3/movie/popular?api_key="+api_key).then(function(response) {
        return response.json();
        
      }).then(function(data) {
        //console.log(data);
        PrintMovies(data);
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });

}


function PrintMovies(data){

    console.log(data);
    console.log(data.results[0]);

    let container = document.getElementById("movies_container");

    data.results.map( (value) =>{
        
        let newDiv = document.createElement("div");
        //newDiv.classList.add("card");
        newDiv.classList.add("movie");


        let principal_container = document.createElement("div");
        newDiv.appendChild(principal_container);
        
        // Get img
        let img = document.createElement("img");
        img.src = img_path + value.poster_path ;
        img.classList.add("img_poster");
        img.addEventListener("click",function(event){
          //event.preventDefault();
          localStorage.setItem("Details",value.id);
          window.location.href = "../movie/movie.html";
        });

        principal_container.appendChild(img);

        // Rating
        let rating = document.createElement("p");
        rating.classList.add("rating");
        
        if(value.vote_average < 4.0){
          rating.classList.add("very_bad_rating");
        }
        if(value.vote_average >= 4.0 && value.vote_average < 5.3){
          rating.classList.add("bad_rating");
        }
        
        if(value.vote_average >= 5.3 && value.vote_average < 6.5){
          rating.classList.add("normal_rating");
        }
        
        if(value.vote_average >= 6.5 && value.vote_average < 8.0){
          rating.classList.add("good_rating");
        }
        
        if(value.vote_average >= 8.0){
          rating.classList.add("very_good_rating");
        }
        rating.innerHTML = parseFloat(value.vote_average).toFixed(1);
        principal_container.appendChild(rating);

        // Guardar en mi lista
        /*
          <button class="bookmark">
    <svg viewBox="0 0 36 36">
        <path class="filled" d="M26 6H10V18V30C10 30 17.9746 23.5 18 23.5C18.0254 23.5 26 30 26 30V18V6Z" />
        <path class="default" d="M26 6H10V18V30C10 30 17.9746 23.5 18 23.5C18.0254 23.5 26 30 26 30V18V6Z" />
        <path class="corner" d="M10 6C10 6 14.8758 6 18 6C21.1242 6 26 6 26 6C26 6 26 6 26 6H10C10 6 10 6 10 6Z" />
    </svg>
</button>
        
        
        */

        // Crear el botón
        let list = document.createElement('button');
        list.classList.add('bookmark');

        // Crear el elemento svg
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 36 36');

        // Crear los elementos path y asignar atributos y clases
        const pathFilled = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathFilled.classList.add('filled');
        pathFilled.setAttribute('d', 'M26 6H10V18V30C10 30 17.9746 23.5 18 23.5C18.0254 23.5 26 30 26 30V18V6Z');

        const pathDefault = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathDefault.classList.add('default');
        pathDefault.setAttribute('d', 'M26 6H10V18V30C10 30 17.9746 23.5 18 23.5C18.0254 23.5 26 30 26 30V18V6Z');

        const pathCorner = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathCorner.classList.add('corner');
        pathCorner.setAttribute('d', 'M10 6C10 6 14.8758 6 18 6C21.1242 6 26 6 26 6C26 6 26 6 26 6H10C10 6 10 6 10 6Z');

        // Añadir los elementos path al elemento svg
        svg.appendChild(pathFilled);
        svg.appendChild(pathDefault);
        svg.appendChild(pathCorner);

        // Añadir el elemento svg al botón
        list.appendChild(svg);

        // Añadir el botón al body o al contenedor deseado
        list.addEventListener("click",function(){
            list.addEventListener('pointerdown', e => {
                if(!list.classList.contains('marked')) {
                    return
                }
                gsap.to(list.querySelectorAll('.default, .filled'), {
                    morphSVG: 'M26 6H10V18C10 22.6863 11 28 11 28C11 28 17.5273 19.5 18 19.5C18.4727 19.5 25 28 25 28C25 28 26 22.6863 26 18V6Z',
                    duration: .15
                })
            })
            list.addEventListener('click', e => {
                e.preventDefault()
        
                if(list.classList.contains('animated')) {
                    return
                }
                list.classList.add('animated')
        
                if(list.classList.contains('marked')) {
                    gsap.fromTo(list.querySelectorAll('.default, .filled'), {
                        morphSVG: 'M26 6H10V18C10 22.6863 11 28 11 28C11 28 17.5273 19.5 18 19.5C18.4727 19.5 25 28 25 28C25 28 26 22.6863 26 18V6Z',
                        duration: .15
                    }, {
                        keyframes: [ {
                            morphSVG: 'M26 6H10V18C10 22.6863 8 31 8 31C8 31 15.9746 26.5 18 23.5C20.0254 26.5 28 31 28 31C28 31 26 22.6863 26 18V6Z',
                            duration: .15
                        }, {
                            morphSVG: 'M26 6H10V18V30C10 30 17.9746 23.5 18 23.5C18.0254 23.5 26 30 26 30V18V6Z',
                            duration: .6,
                            ease: 'elastic.out(1, .7)',
                            onComplete() {
                                list.classList.remove('marked', 'animated')
                            }
                        }]
                    })
                    gsap.to(list, {
                        '--default-position': '24px',
                        duration: .2,
                        clearProps: true
                    })
                    return
                }
        
                gsap.to(list, {
                    '--background-height': '0px',
                    duration: .125,
                    delay: .3
                })
                gsap.to(list, {
                    '--default-y': '-28px',
                    duration: .4
                })
                gsap.to(list.querySelector('.corner'), {
                    keyframes: [{
                        morphSVG: 'M10 6C10 6 14.8758 6 18 6C21.1242 6 26 6 26 6C26 6 28 8.5 28 10H8C8 8.5 10 6 10 6Z',
                        ease: 'none',
                        duration: .125
                    }, {
                        morphSVG: 'M9.99999 6C9.99999 6 14.8758 6 18 6C21.1242 6 26 6 26 6C26 6 31 10.5 26 14H9.99999C4.99999 10.5 9.99999 6 9.99999 6Z',
                        ease: 'none',
                        duration: .15
                    }, {
                        morphSVG: 'M7.99998 16.5C7.99998 16.5 9.87579 22.5 18 22.5C26.1242 22.5 28 16.5 28 16.5C28 16.5 31 20 26 23.5H9.99998C4.99998 20 7.99998 16.5 7.99998 16.5Z',
                        ease: 'power1.in',
                        duration: .125,
                        onComplete() {
                            gsap.set(list.querySelector('.corner'), {
                                fill: 'var(--color)',
                                delay: .05
                            })
                        }
                    }, {
                        morphSVG: 'M8 28C8 28 12.8758 28.5 18 25.5C23.1242 28.5 28 27.5 28 27.5C28 27.5 26 24 26 23.5H10C10 25 8 28 8 28Z',
                        ease: 'none',
                        duration: .125
                    }, {
                        morphSVG: 'M10 30C10 30 17.8758 23.5 18 23.5C18.1242 23.5 26 30 26 30C26 30 26 23.5 26 23H10C10 24.5 10 30 10 30Z',
                        ease: 'elastic.out(1, .7)',
                        duration: .5,
                        onComplete() {
                            list.classList.add('marked')
                            list.classList.remove('animated')
                            gsap.set(list, {
                                '--default-y': '0px',
                                '--default-position': '0px',
                                '--background-height': '19px'
                            })
                            gsap.set(list.querySelector('.corner'), {
                                morphSVG: 'M10 6C10 6 14.8758 6 18 6C21.1242 6 26 6 26 6C26 6 26 6 26 6H10C10 6 10 6 10 6Z',
                                clearProps: true
                            })
                        }
                    }]
                })
            })
        });
        principal_container.appendChild(list);
        


        // Title
        let title = document.createElement("p");
        title.innerHTML = value.original_title;
        principal_container.appendChild(title);
        
        // Description
        let description = document.createElement("a");
        //description.innerHTML = value.overview;
        description.innerHTML = "Read on filmafinity";
        description.classList.add("movie_description");
        description.href = filmafinity_path + value.original_title;
        description.target = "_blank";
        newDiv.appendChild(description);


        container.appendChild(newDiv);
        // img in value.poster_path
    });

}


gsap.registerPlugin(MorphSVGPlugin)


function AddToList(button){
    
}
/*document.querySelectorAll('.bookmark').forEach(button => {
    
})*/