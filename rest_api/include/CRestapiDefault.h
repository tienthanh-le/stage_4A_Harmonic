#ifndef __CRestapiDefault_h__
#define __CRestapiDefault_h__

/*** Includes */

#include <string>

/*** Prototypes */
class CRestapiDefault
{
public:
    void init();
    virtual int getdata(const unsigned int, std::string[]);
    virtual int setdata(const unsigned int, const std::string[]);
};

#endif /* __brConv_h__ */

/* EOF */
