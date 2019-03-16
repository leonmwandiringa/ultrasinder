/**
 * @author Leon Mwandiringa
 * @uses define global settngs  
 * @return home controller object
 */

const Config = {

    PORT: 3000,

    CSRF_TOKENS: ['MIICXAIBAAKBgQCIhvMmFBwSwKgPzhZAMRfUH0pVTZNwWaORqA780uGJvoo5rMNB',
                   'Zp0t8/A8pz0acWyVRYC7+rBHMAl5Ksc2aPjmQBGBtAGTuAP841rmvjfDSfsSMvJ',
                   '43qdTstXahlQVEVWDiQ7z5sVCJE5c9i/fRNyfV/WX/2id8hG8r1euSJ1wIDAQAB',
                   'oGAYzkg0dXfqUlXW1U+Gp0TYljzXxeoRgj/tcZcTia9P6y5LL2AksUsihNk7Cfn',
                   'kMRKVBpVO0kwgCxLVkJe0g5sQeby68ZKtUOVON3fYD0ufINTF2J5tSgEq3MkgLa',
                   'HMiow/AKa/TfkqslqfkmbN6hZggBjFmJnrN10Eo7i5rT/SECQQDWeiur1gJbIfUt',
                   '+nvgHN2nyGH63sUdj4NEwZd2nLEhFC+2WL2JIkOS/jcOrSCXgAQHkKu0ZBuvXNLF',
                   'M/gM8GXfAkEAovVzSstEICdEeyRnkvH2PpqNi9d5J+xpgE4SjqFUCCENcbmqO2IW',
                   'W69cpsqCyMHaaH9wztaw73JCIGQ+CDurCQJAJDfPRh5GmZMbbx88afUV7S5mdVHH',
                   'IZ3JggPbCvmc48Qf5oAHya+Sj7EEJSNRPKQuigSBKl45WpynLwv+mFjEKwJAPkoq',
                   'Xs2h5dR8tcFtodrBcJ6tOmYL1rnkffnZ2BFMyKqxs+XvbzGIMFWwycShB1IqRUVp',
                   'fnbMPUrkgfMvTwBX2QJBALmR/qcC7KfHHMwldUah8lhBUB6EPJvP9PqmaSz1QDpW',
                   'xbfua5F/j+AuHb4jE4EQ13l1i+lgmTrNYhL8lL2IaK8=1rnkffnZ2BFMyKqxs+Xv',],

    CSRF_SECRET: `MIIEpQIBAAKCAQEA12dlfhHukuIevy2a8F8uuUB58jAEfvlr4NnY5BTtopUu5pUF
                  yEEdLz56Ec/+LE/hh1HsjJtHoAtunKOB+xwDVe4/Spsn1wIaUalo0uA/f9kBm+5C
                  Cp+DSq+FEqdWO10M0jl1D1yO9Z4EH7Uz5oVGJWzNZY4I+qc6Ss998q2+kyni1CiI
                  SVA5W0kJvR/1PohZ91x/7tgjr9ZXwGAQlpVB7ole/swGoWoatWVOUPsHLPIsZIUK
                  44Wl0dHs+/WQX/RP8l1pewOdn5jsW44ohNS67k1LFKxMlpGZWa1N6BIh1ilTA6Wr
                  nu+OY0iGUOFjZ46yBNMN3tsJevC5+dpzTpgbuQIDAQABAoIBADnhNKpdkyewzuY8
                  EOgKC3oH0zy6nlqoFs7Cer8+yGPphkK7RGR86qSpOw/SPdAWXtmHr/JQPzzIFZ7N
                  aL3a1yKd9C/N5TSnAf9zcBFJ5IYr/3yw1toX5qWI6E8M2+TzqeBLRCMukdN59E24
                  2QtWQHUJ+V8SfWMs0EMN4h/1g8Hy/r8zuWSqrjpkEt9vCq1Yv+no0dagXMH76IOC
                  VqfOJUeAUEII+/xaPFDKwjt8J6rccRB58/xPnobs4/aBJ9M+rOP1S+FVmHivuuBq
                  anM8r4dT9T8Ob9UoHauW8R1xT/LHrNeYEM59mL4vkiSqqAtfdfn378oGtOJZmavR
                  31hw1yECgYEA/nTwHV2DsZcaydyAv2zzMVqLb4voi7gGEvXYBWm7JZuZUo3IVz6h
                  FfD82VcQ1mfkwPsNRqUNCvBCoKPptIvdDLKyv7kHqoQkCL0BYuOstpLZ93x5bN4Y
                  ++b14W53MVsr8ymCHKvpMDJhtFY+BZeW1MBzBjx7CM6/AgLVAxludx0CgYEA2LXT
                  feam1kBpQI2lFOacnMjEN3/kHkHxjTlST9FX3uUZvqmTOZ17szpKAEwSymnB2zf/
                  XOF3x1tj0bAYrPvbe9jqQEu3mTv1dmJ+E6uT18HFTtc1IPgsg+zR7eia49xdh2dl
                  7e1g6q5/mfMCUCWg6Yt2mFaKsx2qHYe7KlZc6E0CgYEAywf7XzLylYz/7vlmMVd5
                  ZHPetg5oarNXBWHsD8WhcgyJdflzVUm/toYm+jQiVzFmsSSgHzIrCgNS5mJjY5AF
                  vNAJGDlHCKOPLPnCVWlcsgDSsko7iMZeIQDUSB+gM12P3+HK053H3pEUrJPzwPqH
                  exJjtSIk+Y4dkjk4RdTQ83ECgYEAxFgpYF7ENkZxlk0/jqpKpzq3nNlA47E3m46d
                  5zdy9753DuoxO/hVhVOAjLhgJgif3XDk61BU58kDrY5xLPmcKJ+lzc9Mb4eFpFck
                  h8niz47+p6oQtuhj3LuKkJU5EM4t52plTabPMpIbhm5IYDlXi4ISV3/Bdvufj9XU
                  XE2XK9kCgYEApZYMRaS6Cg/LJCxSMcyhtJXXc/H0XRFL2ybiMzORoWTtj8R3Vt8C
                  93cv1JYsgfX0clGtdT5MWE8YQz2yMEtfQwCBGCg6BNq6T1oGYjVUJkYnbjlcEUGK`,

    JWT_SECRET: `MIIEpgIBAAKCAQEA54xPAJOWiRKdEktHXWE4lj1ZiQ9RhjeeT/zmYpB4/YYNApRa
                 aHCMvvkwHXdhNRxYwc8EA84SDQuQnLbm84mbNGmgqE7lFVbgc5DwjurpSf+NhTVf
                 x0lagDoLf+xOgexN8hBenMBAI8QvZkQa22UVf1HENpz6e0AHjgstJrQguQA7jQzA
                 gELIuwht6RnXNOc2eGvsIiIb+S0hB9uR/UNjhxg+cONEV/stG6NDqi+0LCqIeHp1
                 gj+d48SoqeNpowgSSV4gKp6tNEQa4fuJ76nCFUlfrRr2VTT9DcWt03Yw1s00+4bn
                 DgwVDPq131GRdIa+2P3azsuk5QjASuAJoJD6OQIDAQABAoIBAQDf3C4RL59tfJpx
                 MmiXpkPwNPYYZb/61FDxol8W0fi3m19+q/FQYeghRoe3JVDM6VACaGPITfXzuMei
                 S86zi8mK/cg+kLA4VlsAQBPjCMhtK24maHjmEkw2BmhR0CQCxnSBYEQoplIcgjMV
                 WyjgDjWfd20NI+2jNT9YnAOWFLZCRFlzmYy45n8QhrkjRisSQlCwx0O3Lyf54AMn
                 JQl8zdGG3J+LOnfy8bnaevoxtQ2exTgzkOfVSkxkEIleKd+RupT1CWZKeSzWl3fR
                 CzwjNx+YHishtrWsPKW/zU2q733mSVDyK/kIpn0lLqMnwkCAbzEO0kUH0FBDrlqZ
                 /uQs9wZ1AoGBAPgMtr5HhtYxPrXE+MfNoppa0MMnWt7RyHSANfdBbKYQLMs15AH/
                 brtZNlqP78dIdTC0em0Xm2kiipTyIFUJuT9hvtYRXoRrHGVeOgk6ZbDM5U6Hm8HO
                 tfNg/yLWHhueZDyeELDeVfP+It0djERmZtSSfzZquj/JMbq55M3nvjtHAoGBAO74
                 Mlr8b2xrRrNUP5RaZNgHi8fR2aNQUmtpPAccyyvYCGGgll3/Dm9f9X/mxEYBAnLk
                 sbJ4O4vgC//N37QMZ4s+KCN0CxN5Uh91WhLH3M4lwxhDEZwAs/+mJShgRnOWYilI
                 lvY6s/4cQQDW65UI/JF5AXX8vB+N54FUILkQ5t5/AoGBALH67WS6jdVCoGxsWNWE
                 hxeZ8hEVO+6FN//fvtka6Ip/MKTeliuYzCtBZ+6zOKkVJIE9/loohip5zlXxJaHe
                 yDziNbwD2n3JHSbe5WWZsT2axy4Bv5DgcU2gW3Dzkcbfb6zO/crqvWHFB98ARJUP
                 pNkCBKVXDyyVgEkq+TGFBsohAoGBAJG1FD8WHHpnDrzZacrzMvnl3/z+n01M9HQ5
                 vjg3/knFd5bPa9/0XMDcKbzK4HIuu2eCujavyN8IxUg8J2KJDbmBNMgpQXemScSU
                 sU8yPhgUPljUzC/q3dXLYGy2Bz8DOuchM6r/MDCI2bnBUfOVfyrUNWfTqoEy7S2W
                 Nj2haKPRAoGBAISLYHQ4aJLVIGu2jd6dXtZF0+DrSQKXDJ/tfDtgCeWzVtEHjR5d
                 Fd8bEsyPAYrjWKoksVBaMRz8OnbiF8DncViQKm80ztaRszsK7JEOc928lZO/Bx5h`,
    
    STORAGE:{
        cloudinary:{
            name: '',
            key: '',
            secret: ''
        }
    },

    DATABASE:{
        nosql:{
            mongodb:{
                production: "",
                test: ""
            }
        },
        sql:{

        }
    },

    SMTP_RELAY:{
        mailjet:{
            username: '',
            password: '',
            port: 587,
            secure: false,
            from: ''
        }
    },
    CRYPTO:{
        encryption_key: '',
        encryption_size: 32
    },
    CLIENT:{
        url: ""
    }


}

export default Config;