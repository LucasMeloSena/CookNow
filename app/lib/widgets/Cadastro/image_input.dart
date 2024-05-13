import 'dart:io';

import 'package:cooknow/assets/styles/colors.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class ImageInput extends StatefulWidget {
  final Function(File image) onSelectedImage;

  ImageInput({required this.onSelectedImage});

  @override
  State<ImageInput> createState() => _ImageInputState();
}

class _ImageInputState extends State<ImageInput> {
  File? image;

  Future<void> selectImage() async {
    final ImagePicker picker = ImagePicker();
    XFile imageFile = await picker.pickImage(
      source: ImageSource.gallery,
      maxWidth: 600,
    ) as XFile;

    setState(() {
      image = File(imageFile.path);
    });

    widget.onSelectedImage(image!);
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Stack(
        children: [
          Container(
            width: 100,
            height: 100,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(100),
              color: MyColors.grey_600,
            ),
            child: image != null
                ? CircleAvatar(
                    radius: 100,
                    backgroundImage: FileImage(
                      image!,
                    ),
                  )
                : null,
          ),
          Positioned(
            bottom: 0,
            right: 0,
            child: Container(
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                color: MyColors.yellow_200,
              ),
              alignment: Alignment.center,
              width: 40,
              padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 5),
              child: GestureDetector(
                onTap: selectImage,
                child: const Icon(
                  Icons.camera_alt,
                  color: MyColors.black_400,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
