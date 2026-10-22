* {
    box-sizing: border-box;
}

body {
    margin: 0;
    padding: 40px 20px;
    background: #edf0e9;
    color: #203b31;
    font-family: Arial, sans-serif;
    text-align: center;
}

main {
    max-width: 560px;
    margin: 0 auto;
}

h1 {
    font-size: 32px;
}

p {
    line-height: 1.5;
}

#message {
    min-height: 24px;
    color: #714a32;
}

/* The picture frame border */
.frame {
    min-height: 400px;
    margin: 20px 0;
    padding: 30px 20px;
    border: 14px solid #4c3528;
    background: #fffdf7;
    box-shadow: 0 12px 24px #00000020;
    list-style: none;
    cursor: pointer;
}

/* Only the active team is visible. */
.frame li {
    display: none;
}

.frame li.active {
    display: block;
}

.frame img {
    width: 140px;
    height: 140px;
    max-width: 100%;
    object-fit: contain;
}

.frame h2 {
    margin: 20px 0 12px;
    font-size: 28px;
}

.frame p {
    margin: 8px 0;
}

.source {
    margin-top: 24px;
    font-size: 12px;
}

a {
    color: inherit;
}
