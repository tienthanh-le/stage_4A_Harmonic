#ifndef __CLogo_h__
#define __CLogo_h__

/*** Includes */
#include "prm_mainthread.h"
#include "procdef.h"
#include "promain.h"
#include "prm_macro.h"
#include "adaptor.h"
#include <string>

// typedef struct
// {
//     unsigned char logo_number;
//     unsigned char FTP_upload_enable;
//     char logo_pathname[MAX_SIZE_LOGO_PATHNAME + 1];
//     char logo_filename[MAX_SIZE_LOGO_FILENAME + 1];
// } t_NCCPD_logo;

/*** Prototypes */
class CLogo
{
private:
    unsigned int logo_id;
    t_NCCPD_logo m_ologo;

public:
    CLogo();
    ~CLogo();

    const unsigned char get_logo_number() const { return m_ologo.logo_number; };
    void set_logo_number(const unsigned char logo_num) { m_ologo.logo_number = logo_num; };

    unsigned char get_FTP_upload_enable() const { return m_ologo.FTP_upload_enable; };
    void set_FTP_upload_enable(const int32_t FTP_up_en) { m_ologo.FTP_upload_enable = FTP_up_en; };

    std::string get_logo_pathname() const;
    void set_logo_pathname(const std::string);

    std::string get_logo_filename() const;
    void set_logo_filename(const std::string);
};

#endif

/* EOF */
