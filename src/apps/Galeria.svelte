<h1 class="Titulo">Fotos</h1>
<ul class="imagens">
    <li>
        <a href="#img1"><img src="imagens_teste.png" class="min" alt="" /></a>
    </li>
    <li><a href="#img2"><img src="aaaaa.jpg" class="min" alt="" /></a></li>
    <li><a href="#img3"><img src="imagem3.png" class="min" alt="" /></a></li>
    <li><a href="#img4"><img src="imagem4.png" class="min" alt="" /></a></li>
    <li><a href="#img5"><img src="imagem5.png" class="min" alt="" /></a></li>
</ul>
<div class="lbox" id="img1">
    <div class="box_img">
        <a href="" class="btn" id="prev">&#171;</a>
        <a href="" class="btn" id="close">X</a>
        <img src="imagens_teste.png" alt="" />
        <a href="#img2" class="btn" id="next">&#187;</a>
    </div>
</div>
<div class="lbox" id="img2">
    <div class="box_img">
        <a href="#img1" class="btn" id="prev">&#171;</a>
        <a href="" class="btn" id="close">X</a>
        <img src="aaaaa.jpg" alt="" />
        <a href="#img3" class="btn" id="next">&#187;</a>
    </div>
</div>
<div class="lbox" id="img3">
    <div class="box_img">
        <a href="#img2" class="btn" id="prev">&#171;</a>
        <a href="" class="btn" id="close">X</a>
        <img src="imagem3.png" alt="" />
        <a href="#img4" class="btn" id="next">&#187;</a>
    </div>
</div>
<div class="lbox" id="img4">
    <div class="box_img">
        <a href="#img3" class="btn" id="prev">&#171;</a>
        <a href="" class="btn" id="close">X</a>
        <img src="imagem4.png" alt="" />
        <a href="#img5" class="btn" id="next">&#187;</a>
    </div>
</div>
<div class="lbox" id="img5">
    <div class="box_img">
        <a href="#img4" class="btn" id="prev">&#171;</a>
        <a href="" class="btn" id="close">X</a>
        <img src="imagem5.png" alt="" />
        <a href="#img1" class="btn" id="next">&#187;</a>
    </div>
</div>

<style>
    .titulo {
        font-weight: bold;
        margin: auto;
        text-align: center;
    }
    .list {
        list-style: none;
        display: flex;
    }

    .list li {
        letter-spacing: 3px;
        margin-left: 32px;
    }
    a {
        margin: auto;
    }
    .lbox {
        visibility: hidden;
        opacity: 0;
    }
    .imagens {
        height: auto;
        list-style: none;
        display: flex;
        margin: 0 auto;
    }
    .min {
        height: 140px;
        width: 200px;
        padding: 10px;
        max-width: 700px;
        max-height: 700px;
    }
    .lbox:target {
        opacity: 0.95;
        visibility: visible;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: black;
        position: fixed;
    }
    .lbox:target .box_img img {
        opacity: 1;
    }
    .box_img {
        width: 1000px;
        margin: 150px auto;
    }
    .box_img img {
        margin: 0 auto;
        width: 70%;
        max-width: 700px;
        max-height: 419.27px;
        display: block;
    }
    .btn {
        color: white;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        text-decoration: none;
        position: absolute;
        width: 50px;
        height: 50px;
        font-size: 40px;
        text-align: center;
    }
    #prev {
        left: 5%;
        top: 45%;
    }
    #next {
        right: 5%;
        top: 45%;
    }
    #close {
        top: 0;
        right: 2%;
    }
</style>
