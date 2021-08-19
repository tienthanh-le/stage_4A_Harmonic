/*!
* \file CRestapiDefalut.cc
*@{*/

/*** Includes */
#include "prm_mainthread.h"
#include "procdef.h"
#include "promain.h"
#include "prm_macro.h"
#include "adaptor.h"
#include "CIpstream.h"
#include "CRestapiDefault.h"

using namespace std;

/*** Prototypes */

static CIpstream s_oCIpstream[2];

void CRestapiDefault::init()
{
}

int CRestapiDefault::getdata(const unsigned int id, string data[])
{
   int error = 0;

   s_oCIpstream[id].get_ipstream_id();
   data[0] = to_string(s_oCIpstream[id].get_stream_enable());
   data[1] = to_string(s_oCIpstream[id].get_IP_subscribe_address());
   data[2] = to_string(s_oCIpstream[id].get_UDP_subscribe_port());
   data[3] = to_string(s_oCIpstream[id].get_source_IP_address());
   data[4] = to_string(s_oCIpstream[id].get_FEC_enable());
   data[5] = to_string(s_oCIpstream[id].get_physical_port());

   return error;
}

int CRestapiDefault::setdata(const unsigned int id, const string data[])
{
   int error = 0;

   s_oCIpstream[id].set_ipstream_id(id);
   s_oCIpstream[id].set_stream_enable((unsigned char)stoi(data[0]));
   s_oCIpstream[id].set_IP_subscribe_address((int32_t)stoi(data[1]));
   s_oCIpstream[id].set_UDP_subscribe_port((unsigned short)stoi(data[2]));
   s_oCIpstream[id].set_source_IP_address((uint32_t)stoi(data[3]));
   s_oCIpstream[id].set_FEC_enable((unsigned char)stoi(data[4]));
   s_oCIpstream[id].set_physical_port((unsigned char)stoi(data[5]));

   return error;
}

/* EOF */

/* -- */

/* Junk stuffs using for testing, delete after everythings works */

// static Ipstream ipstream;

// void restapi_init()
// {
// }

// int restapi_setdata(const string data[])
// {
//    int error = 0;

//    ipstream.set_stream_enable((unsigned char)std::stoi(data[0]));
//    ipstream.set_IP_subscribe_address((int32_t)std::stoi(data[1]));
//    ipstream.set_UDP_subscribe_port((unsigned short)std::stoi(data[2]));
//    ipstream.set_source_IP_address((uint32_t)std::stoi(data[3]));
//    ipstream.set_FEC_enable((unsigned char)std::stoi(data[4]));
//    ipstream.set_physical_port((unsigned char)std::stoi(data[5]));

//    return error;
// }

// int restapi_getdata(string data[])
// {
//    int error = 0;
//
//    data[0] = std::to_string(ipstream.get_stream_enable());
//    data[1] = std::to_string(ipstream.get_IP_subscribe_address());
//    data[2] = std::to_string(ipstream.get_UDP_subscribe_port());
//    data[3] = std::to_string(ipstream.get_source_IP_address());
//    data[4] = std::to_string(ipstream.get_FEC_enable());
//    data[5] = std::to_string(ipstream.get_physical_port());

//    return error;
// }