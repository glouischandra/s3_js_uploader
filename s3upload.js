(function () {

    function uploadImage() {
        AWS.config.update({ accessKeyId: "KEYHERE", secretAccessKey: "ACCESSKEYHERE" });
        AWS.config.region = 'REGIONHERE';
        var bucket = new AWS.S3({ params: { Bucket: "BUCKETHERE" } });
        
        //Hook to uploader button, please see readme
        $("#image-uploader").change(onUploaderChange);

        function onUploaderChange(event) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $("#image-preview").attr('src', e.target.result);
                $("#image-preview").hide();

                $("#image-upload-btn").click(function () {
                    var targetFilename = guid() + ".jpg";
                    var params = {
                        Key: targetFilename,
                        ACL: "public-read", 
                        ContentType: "image/jpeg",
                        Body: dataURItoBlob(result.toDataURL('image/jpeg', 0.5)),
                        ServerSideEncryption: 'AES256'
                    };

                    $("#image-upload-status").html("Uploading image ...");
                    bucket.putObject(params, function (err, data) {
                        if (err) {
                            $("#image-upload-status").html("Image upload failed. Please refresh and try again.");
                            return false;
                        }
                        else {
                            $("#image-upload-status").html("Image uploaded");
                            $("#image-filename").val(targetFilename);
                        }
                    })
                    .on('httpUploadProgress', function (progress) {
                        // Log Progress Information
                        console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
                    });
                });
            };

            reader.readAsDataURL(event.target.files[0]);
        }

        function dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return new Blob([ia], { type: mimeString });
        }

        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
    }
})();