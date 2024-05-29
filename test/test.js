import * as initia from "@initia/initia.js";
import { bcs } from "@initia/initia.js";

// // console.log(initia.bcs.u8().serialize(50).toBase64());

// console.log(initia.bcs
// .vector(
//     initia.bcs.vector(
//         initia.bcs.u8()
//     )).parse(Uint8Array.from(Buffer.from("EyBG+AxyytyvA5eOkzCKbAmRTVOLLU46mnJIQEf4BtqNtiC2Cyc4+hUVCbbeJUcr1xlfpaOqsSAUUCtl0tU+nHhG1iAMSNlLBh6MrqP2WCKcLvNKxv8CpUGvejDW0YoDZ80esiCKqdIitAIi7XRAlYKr3KDj4xsyW1p5tX/CZpKWb2sxjyAE2MvPw3xVVRKtCVaHKBvoZV1qgTlC526/qzIbbVNY3yAHWo+7YEbiXDSni2qddEFGmWDwXAVZURMcG2Fp+nNlWiCpQUOK108DzM9ZsN66+JsUAbxQ+V4+jIezpjNo+/wE3yDVcvui2+tPFXWudqMvFhiAe//RinbTvSOAAlvfr8MeNSDSZXe2xOhKyWT2LKgXmm73e8XFp3EcqWl8GUoChzSqxiA8SLBVppcO0JamJIBtOGtdNvR8q7piT/NgxEt6SPzBySBt1IaP96gOpQJgx8dORUc/DWiKuRCHZToBy+uuyK3MwyAZuoHVkNe2jn6rLBLi53sPM/pyExKVpGXSacRY7wWGQyDJDmo5wTFqUUJt7ixgbyP8YLtL1oCt9AaO2FfTJxzitiCFNvzVwKE8juazq4Vk/5jSBkwsrum0sa1Pm3h0HtWGnyAKVaZFnp36vgiYV7An2/lxRDmZahHZLd9SO3Pv0PatUiDAmwqRuVm0ZTGLHn/oA2g13cguHD0BlosfaASTHikBhiBrFiMznwTGkApeRrA9SXGy2K3BUjpdxxsw1rhsoAFuByAyNpbglCOCFpu3BfQYNHfrVKVZxbDdHr3FLtJdjeubOSAB8zf6YwqKWYICk2jMC31s6aHcDKoJ6MjL+KJ4WMXSUw==", "base64"))))

const asss = [
  "BAAAAAAAAAA=", //stage
  "EiBm6vdv1GOfsa00OEVZbdO0g55ANzdvD7eWDq+0MfPzVyBbT/+Z2TFdCbW/h4ak8H5CVb7YLFRdoEdNvadby4iaICD4t0E+te1NWhwR7CMTuKOjnQqqsFoxZxnmDRnn55b27iAtJznF55irRtZGrWPUp3H1wS6U25sZ3FK3pIzG0vttLCC3ML1yMYeIJIMy3GR7b/Wx2DgSan/qqu3ELLqQHO71GiBHzvBCarFyqVxroXvGDuyFZNVQVu7o7G7bQUe0xoRBzCCeRxXqVmdvEU5Ja42Zekl5IphC0d98UFWR5kteU+m+ciDaOKI4t7brJWFmtWgOWPx2VqyFL32Mpo/XJHWNeivf3CC0KsKBhcw7HKxikKPa7XY3sHrWBG/PYzDoOCzGxa89ziBVoU0MPeMYOQ8aUSfnjW6+8RQX+oPOKlAqmOO2XdYgSSB4uHsAa5ei0vUm3wM5Xzvv1wBMqiqeytRo3krBwLlTJCA0+b7MVbitZstic4BOlfCAVbdNwRQDsqCBUKDOMjAshiCyUYVLMCoQV7Cj/HJj5QmJmwc0k7AnVhdBUkgSo1TY6iDZVESGh/SduqCV/Rfa5+dbRmUfheYwKLRs6NtUt9bqjiA+GKBPZGvjD/yKXJs9dVRphFS6rc0IbYxR6c4nW6PQqCDAovUhfUeeglQJTyODxQBBL9oPr+dZOKRap2/FE63AnyBE9ZiI0PTbUL0k/G5PGplJsOE5AgemHpYdOS+DF8SJGCATZ1+E5ayprbr2XeSnUigYoF4xCGg9ATe87yS6+tBwAw==",
  "MgAAAAAAAAA=", //task_point
  "AAAAAAAAAAA=" // reff point amm
]

// console.log(initia.bcs
//     .u64() // type
//     .parse(
//       Uint8Array.from(Buffer.from("AAAAAAAAAAA=", 'base64'))
//     ))

// console.log(asss[1])
// console.log(initia.bcs.vector(initia.bcs.u8()).serialize(["init1wd4phwvdx2x0sxn4xulwmjsr52z8vd92767w3x"]).toBase64())

// console.log(initia.bcs.u64().serialize(0).toBase64())


const nn = [ //get_swap_simulation
  "Ari0w69X9eSgBvo1sCsf52UCM8WEtsf7YupiNqom7hs8HcQzRdX/2Vjwb3N/ULY0VTRc3vB9W9zjVe09/lOan4w=",
  "AgEB",
  "AQ==",
  "QEIPAAAAAAA=",
  "p5MKAAAAAAA="
]

const inq = [ //request console browser
  "Asp86bnPbdJQKeais9LOXXhc/4TX1+WGZMfzFfLP9XWM8qBdIEEstc13ne5o5jj2paQlmQOf2WpEZpqFiIJCNgs=",
  "AgEA",
  "AQ==",
  "QEIPAAAAAAA="
]

// serialize value to BCS and encode it to base64
const serializedU64 = bcs
  .u64() // type
  .serialize(1234) // value 
  .toBase64()

// deserialize
const deserializedU64pp = bcs
  .address() // type
  .parse(
    Uint8Array.from(Buffer.from(inq[0], 'base64'))
  )

console.log(deserializedU64pp)
const deserializedU64 = bcs
  .vector(bcs.object()) // type
  .parse(
    Uint8Array.from(Buffer.from(nn[0], 'base64'))
  )

console.log(deserializedU64)

const deserializedU641 = bcs
  .vector(bcs.bool()) // type
  .parse(
    Uint8Array.from(Buffer.from(nn[1], 'base64'))
  )

console.log(deserializedU641)

const deserializedU642 = bcs
  .bool() // type
  .parse(
    Uint8Array.from(Buffer.from(nn[2], 'base64'))
  )

console.log(deserializedU642)

const deserializedU643 = bcs
  .u64() // type
  .parse(
    Uint8Array.from(Buffer.from(nn[3], 'base64'))
  )

console.log(deserializedU643)

const deserializedU644 = bcs
  .u64() // type
  .parse(
    Uint8Array.from(Buffer.from(nn[4], 'base64'))
  )

console.log(deserializedU644)

// vector
const serializedVector = bcs
  .vector(bcs.u64())
  .serialize([123, 456, 789])
  .toBase64();