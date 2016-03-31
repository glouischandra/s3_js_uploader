## What is this?

There are numerous times when I host a web application on amazon and having to hack my way around to allow user to upload an image to S3 without middle tier code. This is my approach to do so using JS and HTML code only

## Note

This requires HTML5 capabilities, but I think we're covered on that. Also there's an SDK from aws that I also uploaded here. Finally customize it to suit your needs as always :)

## HTML
```
<form enctype="multipart/form-data" method="post" name="fileinfo"> 
    <input type="file" id="image-uploader" name="file" required />
</form>
```