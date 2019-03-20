import React, { Component } from 'react'
import firebase from 'firebase/app'
import { connect } from 'react-redux'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import portrait from '../../../static/portrait.png'
import {base64StringtoFile,
        extractImageFileExtensionFromBase64,
        image64toCanvasRef} from '../../../utils/CropOutput'
import { uploadProfilePicture } from '../../../store/actions/ProfilePictureUpload'

class UploadImage extends Component {
  constructor() {
    super()
    this.imagePreviewCanvasRef = React.createRef()
    this.fileInputRef = React.createRef()
    this.state = {
      imageSrc: portrait,
      crop: {
        aspect: 1/1
      },
      style: {
        display: 'none'
      }
    }
  }

  handleFile = (event) => {
    event.persist()
    const input = event.target;
    const imageOriginalName = input.files[0].name
     const reader = new FileReader()
     reader.onload = () => {
       const dataURL = reader.result
       // console.log("img: ", dataURL)

       this.setState(() => {
         return {
           imageSrc: dataURL,
           imgSrcExt: extractImageFileExtensionFromBase64(dataURL),
           imageName: imageOriginalName
         }
       })
     }
     reader.readAsDataURL(input.files[0])
  }

  // closing profile picture upload popup
  handleClick = () => {
    this.props.onClick()
  }

  handleChange = (crop) => {
    this.setState({ crop }, () => {
      // console.log(this.state)
    })
  }

  handleOnCropComplete = (crop, pixelCrop) => {
    const canvasRef = this.imagePreviewCanvasRef.current
    const {imageSrc}  = this.state
    image64toCanvasRef(canvasRef, imageSrc, pixelCrop)
  }

  // handling image upload
  uploadFile = (fileToBeUploaded) => {
    const storage = firebase.storage()
    const storageRef = storage.ref(`ProfilePicture/${this.props.uid}`)

    // inserting image to firestore storage
    const uploadTask = storageRef.put(fileToBeUploaded)

    uploadTask.on('state_changed', (snapshot) => {
      // catch image upload progress
      // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      this.setState(() => {
        return{
          style: {
            display: 'block'
          }
        }
      })
    },
    (error) => {
      console.log("error uploading file", error)
    },
    () => {
      this.setState(() => {
        return{
          style: {
            display: 'none'
          }
        }
      }, () => {
        this.handleClick() // calling function to close profile picture upload popup
      })
      uploadTask.snapshot.ref.getDownloadURL()
      .then(url => {
        var pictureUrl = url
        this.setState(() => {
          return {
            pictureUrl
          }
        },
        () => {
          // console.log(this.state)
          this.props.uploadImage(this.state.pictureUrl)
        })
      })
    })
  }

  // making cropped image usable
  handleSubmit = (e) => {
    e.preventDefault()
    const { imageSrc } = this.state
    if(imageSrc) {
      const canvasRef = this.imagePreviewCanvasRef.current

      const {imgSrcExt} =  this.state
      const {imageName} = this.state
      const imageData64 = canvasRef.toDataURL('image/' + imgSrcExt, 0.4)
      // console.log("img data: ", imageData64)
      this.setState(() => {
        return {
          imageSrc: imageData64
        }
      })
      const myFilename = imageName

      // file to be uploaded
      const newCroppedImage = base64StringtoFile(imageData64, myFilename)
      // console.log("final", newCroppedImage)
      // downloadBase64File(imageData64, myFilename)
      this.uploadFile(newCroppedImage)
    }
  }

  render() {
    return(
      <div className="modal-wrapper">
        <div className="close right" onClick={this.handleClick}>
          <span className="white-text">close</span>
            <i className="material-icons white-text">
              close
            </i>
        </div>
        <div className="image-modal">
          <div className="photo">
            {/*<img src={this.state.imageSrc}
              alt="dp"
              className="responsive-img"/>*/}
            <div className="upload-anim" style={this.state.style}>
              <div className="lds-ripple"><div></div><div></div></div>
            </div>
            <ReactCrop
              className="responsive-img"
              src={this.state.imageSrc}
              crop={this.state.crop}
              onChange={this.handleChange}
              onComplete={this.handleOnCropComplete}/>
              <br/>
              <canvas ref={this.imagePreviewCanvasRef}></canvas>

          </div>
          <div className="select-file center">
            <form>
              <input type="file" onChange={this.handleFile} />
              <button type="submit"
                className="btn indigo z-depth-0"
                onClick={this.handleSubmit}>
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   uploadImage: (pictureUrl) => dispatch(uploadProfilePicture(pictureUrl))
  }
}

export default connect(null, mapDispatchToProps)(UploadImage)
