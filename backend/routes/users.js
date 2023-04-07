const router = require("express").Router();
const { BookingSeats } = require("../models/booking");
router.post("/book", async (req, res) => {
  console.log("request received");

  let { seats } = req.body;
  seats=seats*1;
  const seatInfo = [];
  const [{coaches}] = await BookingSeats.find({});
  for( const key in coaches) {
    let coach = key;
    let val = coaches[key];
    for(const key in val){
      const row = key;
      const totalseats = val[key];
      if(row=="rowA11")
      {
          if (isAvailableSecond(totalseats)) {
        const updatedSeats = totalseats + seats;
        for(let i =totalseats;i<updatedSeats;i++)
            {
                
                seatInfo.push(row.slice(3,6)+i);
            }
        await BookingSeats.updateOne(
          { _id: "642ff3facdf1182b7f2df715" },
          {
            $set: { [`coaches.${coach}.${row}`]: updatedSeats },
          }
        )
          .then((err, doc) => {
            console.log(seatInfo)
            return res.status(200).json({
                data : seatInfo,
              message: `${seats} seats have been booked in ${row} of ${coach}`,
              success:true

            });

          })
          .catch((err) => {
            if (err) return res.status(500).json({ error: true, message: err });
            
          });
          break;
      }
      else
      {
        return res.status(400).json({error:true });
      }
      }
      else
      {
        if (isAvailable(totalseats)) {
        const updatedSeats = totalseats + seats;
        if(row=="rowA10")
        {

            for(let i =totalseats;i<updatedSeats;i++)
            {
                
                seatInfo.push(row.slice(3,6)+i);
            }
        }
        else
        {

            for(let i =totalseats;i<updatedSeats;i++)
            {
                
                seatInfo.push(row.slice(3,5)+i);
            }
        }
        await BookingSeats.updateOne(
          { _id: "642ff3facdf1182b7f2df715" },
          {
            $set: { [`coaches.${coach}.${row}`]: updatedSeats },
          }
        )
          .then((err, doc) => {
              console.log(seatInfo)
            return res.status(200).json({
                data : seatInfo,
              message: `${seats} seats have been booked in ${row} of ${coach}`,
              success:true
            });

          })
          .catch((err) => {
            if (err) return res.status(500).json({ error: true, message: err });
          });
          break;
      }
      }

    };
    
  }

  function isAvailable(totalseats) {
    const result = 7 - totalseats;
    if (result >= seats) {
      return true;
    } else {
      return false;
    }
  }
  function isAvailableSecond(totalseats) {
    const result = 3 - totalseats;
    if (result >= seats) {
      return true;
    } else {
      return false;
    }
  }
});

router.post("/createSchema", async (req, res) => {
  console.log("request received");
  const { coaches } = req.body;
  const newbooking = new BookingSeats({
    coaches,
  });

  newbooking
    .save()
    .then(() => {
      return res.status(200).json("Schema saved");
    })
    .catch((error) => {
      return res.status(400).json(error.message);
    });

  // try{
  //     console.log(coaches)
  //     const booking = await BookingSeats.create({coaches})
  //     return res.status(400).json("Schema created")
  // }
  // catch(err){
  //    console.log(err)
  // }
});

router.post("/login", async (req, res) => {
  const { name, email } = req.body;
  const newUser = new User({
    name,
    email,
  });
  newUser
    .save()
    .then(() => {
      return res.status(200).json("schema created");
    })
    .catch((error) => {
      return res.status(400).json(error.message);
    });
});

module.exports = router;
