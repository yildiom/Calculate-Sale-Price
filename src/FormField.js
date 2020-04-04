import React from 'react';
import { Form, Button, Col, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';


class FormField extends React.Component {
    state = {
        alisFiyati: 0,
        ilkKargo:0,
        trKargo:0,
        urunBoyutu:"",
        karYuzdesi:0,
        guncelKur:0,
        ekstraMasraf:0,
        toplamMaliyet: 0,
        kar: 0,
        satisFiyati: 0,
        satisFiyatiGoster: false,

    }
    maliyetHesapla = () => {
        const {alisFiyati,
            ilkKargo,
            trKargo,
            urunBoyutu,
            karYuzdesi,
            guncelKur,
            ekstraMasraf} = this.state;

            let beTRKargoGumruk = 0;
            if(urunBoyutu === "kucuk"){
                beTRKargoGumruk = ((36 / 10) * guncelKur) + (68/10)
            } else if(urunBoyutu === "orta"){
                beTRKargoGumruk = ((36 / 5) * guncelKur) + (68/5)
            } else if(urunBoyutu === "buyuk"){
                beTRKargoGumruk = ((36 / 3) * guncelKur) + (68/3)
            } else {
                beTRKargoGumruk = 0
            }

        const toplamMaliyet = (alisFiyati * guncelKur) + 
        (ilkKargo * guncelKur) + 
        trKargo + 
        beTRKargoGumruk + ekstraMasraf;

        this.setState({toplamMaliyet: toplamMaliyet});

        const kar = ((alisFiyati * guncelKur* karYuzdesi )/ 100)

        this.setState({kar: kar});

        const satisFiyati = toplamMaliyet + kar;

        this.setState({satisFiyati: satisFiyati});

        this.setState({satisFiyatiGoster: true})

    }

    render(){
        return (
        <Container>
<Form className="form" onSubmit={e => {
    e.preventDefault();
    console.log(this.state);
}}>

<OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id='tooltip-bottom'>
            Euro alış fiyatını yazın. Ör: 20
          </Tooltip>
        }
      >
        <Form.Group as={Col} >
      <Form.Label>Alış Fiyatı</Form.Label>
      <Form.Control size="sm" onChange={e => this.setState({
          alisFiyati:parseFloat(e.target.value)
      })}/>
    </Form.Group>
</OverlayTrigger>

    
<OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id='tooltip-bottom'>
            Ürünün Belçika'ya geliş kargosunu Euro olarak yazın. Ör: 1.5. Yoksa 0 yazın.
          </Tooltip>
        }
      >
           <Form.Group as={Col} >
      <Form.Label>İlk kargo</Form.Label>
      <Form.Control size="sm" onChange={e => this.setState({
          ilkKargo:parseFloat(e.target.value)
      })}/>
    </Form.Group>
      </OverlayTrigger>
   
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id='tooltip-bottom'>
            Türkiye içi kargoyu TL olarak yazın. Ör: 20. Yoksa 0 yazın.
          </Tooltip>
        }
      >
  <Form.Group as={Col} >
      <Form.Label>TR içi kargo</Form.Label>
      <Form.Control size="sm" onChange={e => this.setState({
          trKargo:parseFloat(e.target.value)
      })}/>
    </Form.Group>
    </OverlayTrigger>

  <Form.Row className="form-3lu-alan">

  <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id='tooltip-bottom'>
            Küçük boy üründen kargoya 10 adet sığmaktadır <br/>
            Orta boy üründen kargoya 5 adet sığmaktadır <br/>
            Büyük boy üründen kargoya 3 adet sığmaktadır <br/>
          </Tooltip>
        }
      >
  <Form.Group  controlId="exampleForm.SelectCustom">
    <Form.Label>Ürün Boyutu</Form.Label>
    <Form.Control size="sm" as="select" custom onChange={e => this.setState({
          urunBoyutu:e.target.value
      })}>
      <option>kucuk</option>
      <option>orta</option>
      <option>buyuk</option>
    </Form.Control>
  </Form.Group>
  </OverlayTrigger>

  <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id='tooltip-bottom'>
            Başında % olmadan yazın. Ör: 40
          </Tooltip>
        }
      >
    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Kar Yüzdesi</Form.Label>
      <Form.Control size="sm" onChange={e => this.setState({
          karYuzdesi:parseFloat(e.target.value)
      })}/>
    </Form.Group>
    </OverlayTrigger>

    <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id='tooltip-bottom'>
            1 Euro'nun TL cinsinden değerini yazın
          </Tooltip>
        }
      >
    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Güncel Kur</Form.Label>
      <Form.Control size="sm" placeholder="Ör. 7.3" onChange={e => this.setState({
          guncelKur:parseFloat(e.target.value)
      })}/>
    </Form.Group>
    </OverlayTrigger>

  </Form.Row>
  <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id='tooltip-bottom'>
            Varsa ekstra masraf tutarını TL olarak yazın. Yoksa 0 yazın.
          </Tooltip>
        }
      >
  <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>Ekstra masraf</Form.Label>
      <Form.Control size="sm" onChange={e => this.setState({
          ekstraMasraf:parseFloat(e.target.value)
      })}/>
    </Form.Group>
    </OverlayTrigger>

  <Button className="button" variant="primary" type="submit" onClick={() => {
      this.maliyetHesapla();
  }}>
    Hesapla
  </Button>
</Form>
{this.state.satisFiyatiGoster && <div className="sonuc">
                    <div>
                        Bu ürünün satış fiyatı <span className="satisFiyati">{this.state.satisFiyati}</span>TL'dir.
                    </div>
                    <div>
                        Bu ürününün toplam maliyeti <span className="toplamMaliyet">{this.state.toplamMaliyet}</span>TL'dir.
                    </div>
                    <div>
                        Bu üründen karınız <span className="kar">{this.state.kar}</span>TL'dir.
                    </div>
                </div>
    }


</Container>
  
  )
    }
  
};

export default FormField;
